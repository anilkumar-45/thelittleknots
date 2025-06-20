
-- Insert mock product data into products table with proper UUIDs
INSERT INTO public.products (id, name, price, description, category, in_stock) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Handmade Cotton Tote Bag', 899.00, 'Beautiful handcrafted tote bag made with premium cotton yarn. Perfect for shopping or daily use. Eco-friendly and durable with reinforced handles.', 'accessories', true),
('550e8400-e29b-41d4-a716-446655440002', 'Cute Amigurumi Cat', 650.00, 'Adorable crocheted cat toy made with soft, child-safe yarn. Perfect gift for kids and cat lovers! Hypoallergenic and washable.', 'toys', true),
('550e8400-e29b-41d4-a716-446655440003', 'Cozy Winter Scarf', 750.00, 'Warm and stylish crocheted scarf perfect for Indian winters. Available in multiple colors. Soft and comfortable with beautiful patterns.', 'accessories', false),
('550e8400-e29b-41d4-a716-446655440004', 'Rainbow Baby Blanket', 1299.00, 'Soft and colorful baby blanket perfect for newborns. Made with hypoallergenic yarn. A perfect gift for new parents with vibrant rainbow colors.', 'accessories', true),
('550e8400-e29b-41d4-a716-446655440005', 'Amigurumi Elephant Toy', 499.00, 'Cute little elephant toy crocheted with love. Safe for children and makes a great decorative piece too. Features intricate details and soft texture.', 'toys', true),
('550e8400-e29b-41d4-a716-446655440006', 'Flower Keychain Set', 299.00, 'Beautiful set of 3 crocheted flower keychains in different colors. Perfect for bags, keys, or as small gifts. Durable and vibrant.', 'keytags', true),
('550e8400-e29b-41d4-a716-446655440007', 'Cute Animal Keytags', 199.00, 'Adorable mini animal keytags including cats, dogs, and bears. Perfect for personalizing your keys or bag. Sold individually.', 'keytags', true);

-- Insert product images for each product with proper UUIDs
INSERT INTO public.product_images (product_id, image_url, is_primary, display_order) VALUES
-- Product 1 images
('550e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop', true, 0),
('550e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', false, 1),
('550e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1594736797933-d0c62c2d6ace?w=400&h=400&fit=crop', false, 2),
('550e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop', false, 3),
('550e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1613486071834-3b1a6e8569c5?w=400&h=400&fit=crop', false, 4),

-- Product 2 images
('550e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop', true, 0),
('550e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop', false, 1),
('550e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop', false, 2),
('550e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', false, 3),
('550e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1620370509730-12d0e0de3b8a?w=400&h=400&fit=crop', false, 4),

-- Product 3 images
('550e8400-e29b-41d4-a716-446655440003', 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop', true, 0),
('550e8400-e29b-41d4-a716-446655440003', 'https://images.unsplash.com/photo-1594736797933-d0c62c2d6ace?w=400&h=400&fit=crop', false, 1),
('550e8400-e29b-41d4-a716-446655440003', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop', false, 2),
('550e8400-e29b-41d4-a716-446655440003', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', false, 3),
('550e8400-e29b-41d4-a716-446655440003', 'https://images.unsplash.com/photo-1576949722334-e3b7c5b7e2d2?w=400&h=400&fit=crop', false, 4),

-- Product 4 images
('550e8400-e29b-41d4-a716-446655440004', 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop', true, 0),
('550e8400-e29b-41d4-a716-446655440004', 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop', false, 1),
('550e8400-e29b-41d4-a716-446655440004', 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop', false, 2),
('550e8400-e29b-41d4-a716-446655440004', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop', false, 3),
('550e8400-e29b-41d4-a716-446655440004', 'https://images.unsplash.com/photo-1612198507018-c5c7c5dd2ad5?w=400&h=400&fit=crop', false, 4),

-- Product 5 images
('550e8400-e29b-41d4-a716-446655440005', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', true, 0),
('550e8400-e29b-41d4-a716-446655440005', 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop', false, 1),
('550e8400-e29b-41d4-a716-446655440005', 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop', false, 2),
('550e8400-e29b-41d4-a716-446655440005', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop', false, 3),
('550e8400-e29b-41d4-a716-446655440005', 'https://images.unsplash.com/photo-1561572887-4e86b8ec8a50?w=400&h=400&fit=crop', false, 4),

-- Product 6 images
('550e8400-e29b-41d4-a716-446655440006', 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop', true, 0),
('550e8400-e29b-41d4-a716-446655440006', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop', false, 1),
('550e8400-e29b-41d4-a716-446655440006', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', false, 2),
('550e8400-e29b-41d4-a716-446655440006', 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop', false, 3),
('550e8400-e29b-41d4-a716-446655440006', 'https://images.unsplash.com/photo-1589902144335-ad3e5e38c2c3?w=400&h=400&fit=crop', false, 4),

-- Product 7 images
('550e8400-e29b-41d4-a716-446655440007', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop', true, 0),
('550e8400-e29b-41d4-a716-446655440007', 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop', false, 1),
('550e8400-e29b-41d4-a716-446655440007', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', false, 2),
('550e8400-e29b-41d4-a716-446655440007', 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop', false, 3),
('550e8400-e29b-41d4-a716-446655440007', 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=400&fit=crop', false, 4);

-- Create contact messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  read BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS for contact messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contact messages (admin can view all, anyone can insert)
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view contact messages" ON public.contact_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
);
CREATE POLICY "Admins can update contact messages" ON public.contact_messages FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
);

-- Create a default admin user (you'll need to sign up with this email first)
-- Note: The user_id will be populated when the admin signs up with Supabase Auth
INSERT INTO public.admin_users (email) VALUES ('admin@littleknots.com');
