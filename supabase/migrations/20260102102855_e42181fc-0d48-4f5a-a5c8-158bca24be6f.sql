-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  department TEXT,
  semester TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create book category enum
CREATE TYPE public.book_category AS ENUM ('sell', 'lend', 'free');

-- Create book status enum
CREATE TYPE public.book_status AS ENUM ('available', 'reserved', 'taken');

-- Create books table
CREATE TABLE public.books (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  edition TEXT,
  description TEXT,
  category public.book_category NOT NULL DEFAULT 'sell',
  price DECIMAL(10, 2),
  course_tag TEXT,
  image_url TEXT,
  status public.book_status NOT NULL DEFAULT 'available',
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on books
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- Create indexes for search
CREATE INDEX idx_books_title ON public.books USING GIN(to_tsvector('english', title));
CREATE INDEX idx_books_author ON public.books USING GIN(to_tsvector('english', author));
CREATE INDEX idx_books_category ON public.books(category);
CREATE INDEX idx_books_course_tag ON public.books(course_tag);
CREATE INDEX idx_books_status ON public.books(status);
CREATE INDEX idx_books_owner ON public.books(owner_id);

-- RLS Policies for profiles
-- Users can view all profiles (for book owner info)
CREATE POLICY "Profiles are viewable by everyone"
ON public.profiles
FOR SELECT
USING (true);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for books
-- Anyone can view available books
CREATE POLICY "Books are viewable by everyone"
ON public.books
FOR SELECT
USING (true);

-- Authenticated users can create books
CREATE POLICY "Authenticated users can create books"
ON public.books
FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);

-- Users can update their own books
CREATE POLICY "Users can update their own books"
ON public.books
FOR UPDATE
USING (owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- Users can delete their own books
CREATE POLICY "Users can delete their own books"
ON public.books
FOR DELETE
USING (owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_books_updated_at
BEFORE UPDATE ON public.books
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, email, department, semester)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'name', new.email),
    new.email,
    new.raw_user_meta_data ->> 'department',
    new.raw_user_meta_data ->> 'semester'
  );
  RETURN new;
END;
$$;

-- Trigger to create profile on auth user creation
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();