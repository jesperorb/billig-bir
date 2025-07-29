-- Run this after migrations to populate initial data

-- Insert test user (for development/testing purposes)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-1111-1111-111111111111',
  'authenticated',
  'authenticated',
  'test@billigbeer.se',
  crypt('billigsomfan', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Test User"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Insert identity for the test user
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  '{"sub":"11111111-1111-1111-1111-111111111111","email":"test@billigbeer.se"}',
  'email',
  '11111111-1111-1111-1111-111111111111',
  NOW(),
  NOW(),
  NOW()
);

-- Insert 10 districts
INSERT INTO public.district (name, inside_tolls) VALUES
  ('Södermalm', true),
  ('Gamla Stan', true),
  ('Norrmalm/City', true),
  ('Kungsholmen', true),
  ('Vasastan', true),
  ('Östermalm', true),
  ('Vasastan', true),
  ('Mordor', false),
  ('Nacka', false),
  ('Reimersholme', true);

-- Insert aw_time records (some for individual days, some for all week)
INSERT INTO public.aw_time (weekday, start_time, end_time, same_times_all_week) VALUES
  -- Same times all week entries (using Monday as representative day)
  (0, '15:00:00', '18:00:00', true),  -- id: 1 (Monday-Friday 15-18)
  (0, '16:00:00', '19:00:00', true),  -- id: 2 (Monday-Friday 16-19)
  (0, '17:00:00', '20:00:00', true),  -- id: 3 (Monday-Friday 17-20)
  (0, '15:30:00', '18:30:00', true),  -- id: 4 (Monday-Friday 15:30-18:30)
  (0, '16:30:00', '19:30:00', true),  -- id: 5 (Monday-Friday 16:30-19:30)
  
  -- Individual day entries for locations with multiple aw times
  (0, '15:00:00', '18:00:00', false), -- id: 6 (Monday)
  (1, '15:00:00', '18:00:00', false), -- id: 7 (Tuesday)
  (2, '15:00:00', '18:00:00', false), -- id: 8 (Wednesday)
  (3, '15:00:00', '18:00:00', false), -- id: 9 (Thursday)
  (4, '15:00:00', '18:00:00', false), -- id: 10 (Friday)
  
  -- Second set of individual day entries
  (0, '16:00:00', '19:00:00', false), -- id: 11 (Monday)
  (1, '16:00:00', '19:00:00', false), -- id: 12 (Tuesday)
  (2, '16:00:00', '19:00:00', false), -- id: 13 (Wednesday)
  (3, '16:00:00', '19:00:00', false), -- id: 14 (Thursday)
  (4, '16:00:00', '19:00:00', false); -- id: 15 (Friday)

-- Insert 10 locations
INSERT INTO public.location (
  name, 
  latitude, 
  longitude, 
  outdoor_seating, 
  afternoon_sun, 
  url_maps, 
  url_website, 
  price_standard, 
  price_aw, 
  price_pitcher, 
  centiliters_standard, 
  centiliters_pitcher, 
  beer_brand
) VALUES
  ('Akkurat Bar', 59.3183, 18.0685, true, false, 'https://maps.google.com/?q=Akkurat+Bar+Stockholm', 'https://akkurat.se', 85, 65, 450, 40, 180, 'Pilsner Urquell'),
  ('Brewdog Stockholm', 59.3293, 18.0686, false, false, 'https://maps.google.com/?q=Brewdog+Stockholm', 'https://brewdog.com', 95, 75, 500, 40, 180, 'Punk IPA'),
  ('Monks Café', 59.3147, 18.0723, true, true, 'https://maps.google.com/?q=Monks+Cafe+Stockholm', 'https://monks.se', 78, 58, 420, 40, 180, 'Stella Artois'),
  ('Tuborgbaren', 59.3265, 18.0704, false, false, 'https://maps.google.com/?q=Tuborgbaren+Stockholm', 'https://tuborgbaren.se', 72, 52, 380, 40, 180, 'Tuborg'),
  ('Wirströms Pub', 59.3156, 18.0647, true, true, 'https://maps.google.com/?q=Wirstrom+Pub+Stockholm', 'https://wirstrom.se', 88, 68, 460, 40, 180, 'Guinness'),
  ('Pickwick Pub', 59.3223, 18.0512, true, false, 'https://maps.google.com/?q=Pickwick+Pub+Stockholm', 'https://pickwick.se', 82, 62, 440, 40, 180, 'London Pride'),
  ('Södra Teatern', 59.3142, 18.0734, true, true, 'https://maps.google.com/?q=Sodra+Teatern+Stockholm', 'https://sodrateater.com', 92, 72, 480, 40, 180, 'Carlsberg'),
  ('Berns Salonger', 59.3325, 18.0734, false, false, 'https://maps.google.com/?q=Berns+Stockholm', 'https://berns.se', 125, null, 650, 40, 180, 'Heineken'),
  ('Sturehof', 59.3345, 18.0756, true, false, 'https://maps.google.com/?q=Sturehof+Stockholm', 'https://sturehof.com', 110, null, 580, 40, 180, 'Stella Artois'),
  ('Mosebacke Etablissement', 59.3156, 18.0812, true, true, 'https://maps.google.com/?q=Mosebacke+Stockholm', 'https://mosebacke.se', 89, null, 470, 40, 180, 'Pripps Blå');

-- Link locations to districts
INSERT INTO public.location_district (location_id, district_id) VALUES
  (1, 1), -- Akkurat Bar -> Södermalm
  (2, 3), -- Brewdog -> Norrmalm/City
  (3, 1), -- Monks Café -> Södermalm
  (4, 5), -- Tuborgbaren -> Vasastan
  (5, 1), -- Wirströms Pub -> Södermalm
  (6, 4), -- Pickwick Pub -> Kungsholmen
  (7, 1), -- Södra Teatern -> Södermalm
  (8, 3), -- Berns -> Norrmalm/City
  (9, 6), -- Sturehof -> Östermalm
  (10, 1); -- Mosebacke -> Södermalm

-- Link 7 locations to aw times
-- 5 locations with same_times_all_week = true (single aw time each)
INSERT INTO public.location_aw_time (location_id, aw_time_id) VALUES
  (1, 1), -- Akkurat Bar -> same times all week (15-18)
  (2, 2), -- Brewdog -> same times all week (16-19)
  (3, 3), -- Monks Café -> same times all week (17-20)
  (4, 4), -- Tuborgbaren -> same times all week (15:30-18:30)
  (5, 5); -- Wirströms Pub -> same times all week (16:30-19:30)

-- 2 locations with multiple aw times (individual days)
INSERT INTO public.location_aw_time (location_id, aw_time_id) VALUES
  -- Pickwick Pub (location 6) - Monday to Friday schedule
  (6, 6), (6, 7), (6, 8), (6, 9), (6, 10),
  -- Södra Teatern (location 7) - Monday to Friday schedule with different times
  (7, 11), (7, 12), (7, 13), (7, 14), (7, 15);

-- Insert aw_time_submission records for location submissions
INSERT INTO public.aw_time_submission (weekday, start_time, end_time, same_times_all_week) VALUES
  -- For location submission with same_times_all_week
  (0, '14:00:00', '17:00:00', true),  -- id: 1 (Monday-Friday 14-17)
  
  -- For location submission with multiple aw times
  (0, '15:30:00', '18:30:00', false), -- id: 2 (Monday)
  (1, '15:30:00', '18:30:00', false), -- id: 3 (Tuesday)
  (2, '15:30:00', '18:30:00', false), -- id: 4 (Wednesday)
  (3, '15:30:00', '18:30:00', false), -- id: 5 (Thursday)
  (4, '15:30:00', '18:30:00', false); -- id: 6 (Friday)

-- Insert 5 location submissions
INSERT INTO public.location_submission (
  name, 
  latitude, 
  longitude, 
  outdoor_seating, 
  afternoon_sun, 
  url_maps, 
  url_website, 
  price_standard, 
  price_aw, 
  price_pitcher, 
  centiliters_standard, 
  centiliters_pitcher, 
  beer_brand
) VALUES
  ('The Auld Dubliner', 59.3234, 18.0645, true, false, 'https://maps.google.com/?q=Auld+Dubliner+Stockholm', 'https://aulddubliner.se', 86, 66, 450, 40, 180, 'Guinness'),
  ('Café Opera', 59.3301, 18.0723, false, false, 'https://maps.google.com/?q=Cafe+Opera+Stockholm', 'https://cafeopera.se', 115, 95, 600, 40, 180, 'Peroni'),
  ('Kvarnen', 59.3145, 18.0756, true, true, 'https://maps.google.com/?q=Kvarnen+Stockholm', 'https://kvarnen.com', 75, null, 400, 40, 180, 'Pripps Blå'),
  ('Soldaten Svejk', 59.3167, 18.0634, false, false, 'https://maps.google.com/?q=Soldaten+Svejk+Stockholm', 'https://soldatensvejk.se', 79, 59, 420, 40, 180, 'Pilsner Urquell'),
  ('East Restaurant', 59.3145, 18.0812, true, false, 'https://maps.google.com/?q=East+Restaurant+Stockholm', 'https://east.se', 98, null, 520, 40, 180, 'Asahi');

-- Link location submissions to districts
INSERT INTO public.location_district_submission (location_id, district_id) VALUES
  (1, 3), -- The Auld Dubliner -> Norrmalm/City
  (2, 3), -- Café Opera -> Norrmalm/City
  (3, 1), -- Kvarnen -> Södermalm
  (4, 1), -- Soldaten Svejk -> Södermalm
  (5, 1); -- East Restaurant -> Södermalm

-- Link 2 location submissions to aw times
-- 1 location submission with same_times_all_week = true
INSERT INTO public.location_aw_time_submission (location_id, aw_time_id) VALUES
  (1, 1); -- The Auld Dubliner -> same times all week (14-17)

-- 1 location submission with multiple aw times (individual days)
INSERT INTO public.location_aw_time_submission (location_id, aw_time_id) VALUES
  (4, 2), (4, 3), (4, 4), (4, 5), (4, 6); -- Soldaten Svejk -> Monday to Friday schedule
