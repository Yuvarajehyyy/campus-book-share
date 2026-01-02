-- Create storage bucket for book images
INSERT INTO storage.buckets (id, name, public)
VALUES ('book-images', 'book-images', true);

-- Allow anyone to view book images
CREATE POLICY "Book images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'book-images');

-- Authenticated users can upload book images
CREATE POLICY "Authenticated users can upload book images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'book-images' AND auth.uid() IS NOT NULL);

-- Users can update their own book images
CREATE POLICY "Users can update their own book images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'book-images' AND auth.uid() IS NOT NULL);

-- Users can delete their own book images
CREATE POLICY "Users can delete their own book images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'book-images' AND auth.uid() IS NOT NULL);