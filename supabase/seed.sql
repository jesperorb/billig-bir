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

-- Insert aw_time records (for O'learys Centralen)
INSERT INTO public.aw_time (weekday, start_time, end_time, same_times_all_week) VALUES
  -- O'learys Centralen individual day entries
  (0, '16:00:00', '18:00:00', false), -- id: 1 (Monday)
  (1, '16:00:00', '18:00:00', false), -- id: 2 (Tuesday)
  (2, '16:00:00', '18:00:00', false); -- id: 3 (Wednesday)

-- Insert production locations
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
  ('O''learys Centralen', 59.3307648940387, 18.0593531415575, true, false, 'https://maps.app.goo.gl/4MNdP27BZ4RVU6yZA', 'https://olearys.se/stockholm-central/food/', 105, 89, null, 40, null, 'Norrlands guld'),
  ('Laughing Duck', 59.3321126429971, 18.0575052842367, true, false, 'https://maps.app.goo.gl/cJQm71jBisVRMthh6', 'https://laughingduck.se/', 49, null, null, 40, null, 'Gränges'),
  ('Kungsbiljarden', 59.3318981882231, 18.0515030984511, true, true, 'https://maps.app.goo.gl/UZC1sQZyKCdVPP8M6', 'https://kungsbiljarden.se/matmeny/', 59, null, null, 40, null, 'Heineken'),
  ('Da Antonio e Lucia', 59.3179427725633, 18.1555131246945, true, true, 'https://maps.app.goo.gl/bJijz6maaHzCCxzw7?g_st=ipc', null, 95, null, null, 40, null, 'Birra Poretti'),
  ('Båten Gustavsberg VII', 59.3071493628784, 18.3224462560667, true, true, null, 'https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/ta-baten-till-artipelag/', 97, null, null, 50, null, 'Mariestad'),
  ('Reimersholme Hotell', 59.3180787295785, 18.0251944431421, true, true, 'https://maps.app.goo.gl/HUTz2X6J5gCwGRgR7', 'https://reimersholmehotel.se', 72, null, null, 40, null, 'St Eriks Ljus Lager'),
  ('Vapiano', 59.3306652868022, 18.0598846076465, true, true, 'https://maps.app.goo.gl/7Nr3D8m65pkrMdgk6', 'http://vapiano.se/', 69, null, null, 40, null, 'Birra Poretti'),
  ('Dagnys', 59.3306660708826, 18.0576700162376, false, false, 'https://maps.app.goo.gl/AvnXEnAfY48Aim5z6', null, 69, null, null, 40, null, 'Sofiero'),
  ('Greek Taverna Giamas', 59.3297109940649, 18.0607212291334, true, true, 'https://maps.app.goo.gl/vgjQhG3HHhNayw5h7', 'https://greektaverna.se/meny/', 55, null, null, 40, null, 'Inte Mythos'),
  ('The Lobby', 59.3337555536363, 18.0568473341268, false, false, 'https://maps.app.goo.gl/KTD3kZtC1r97fwYAA', 'http://www.thelobbysthlm.nu/', 39, null, null, 40, null, 'Fat 21'),
  ('Scandic Downtown Camper', 59.3313718169187, 18.0655643554777, true, false, 'https://maps.app.goo.gl/d9eQK2Z6gnkXdX1H7', 'https://www.scandichotels.com/sv/hotell/downtown-camper-by-scandic/campfire', 86, null, null, 40, null, 'Mariestad'),
  ('Scandic Continental', 59.3311819348837, 18.0596204419085, true, true, 'https://maps.app.goo.gl/FBhrquQhDYANmP8y8', 'https://www.scandichotels.se/hotell/sverige/stockholm/scandic-continental/restaurang-bar/capital', 86, null, null, 40, null, 'Mariestad'),
  ('Perini', 59.3312227072964, 18.0576781554006, true, true, 'https://maps.app.goo.gl/Wo7KeXJ4Yufvc4oM9', 'http://www.perini.se/', 89, null, null, 40, null, 'Birra Poretti'),
  ('Bistro Sickla', 59.30526523381, 18.1213862108696, true, true, 'https://maps.app.goo.gl/dCFEDXqJXjxYA2jb6', null, 78, null, null, 50, null, 'Eriksberg Karaktär');

-- Link locations to districts
INSERT INTO public.location_district (location_id, district_id) VALUES
  (1, 3), -- O'learys Centralen -> Norrmalm/City
  (2, 3), -- Laughing Duck -> Norrmalm/City
  (3, 3), -- Kungsbiljarden -> Norrmalm/City
  (4, 9), -- Da Antonio e Lucia -> Nacka
  (5, 8), -- Båten Gustavsberg VII -> Mordor
  (6, 10), -- Reimersholme Hotell -> Reimersholme
  (7, 3), -- Vapiano -> Norrmalm/City
  (8, 3), -- Dagnys -> Norrmalm/City
  (9, 3), -- Greek Taverna Giamas -> Norrmalm/City
  (10, 3), -- The Lobby -> Norrmalm/City
  (11, 3), -- Scandic Downtown Camper -> Norrmalm/City
  (12, 3), -- Scandic Continental -> Norrmalm/City
  (13, 3), -- Perini -> Norrmalm/City
  (14, 9); -- Bistro Sickla -> Nacka

-- Link locations to aw times
-- Only O'learys Centralen has aw times
INSERT INTO public.location_aw_time (location_id, aw_time_id) VALUES
  -- O'learys Centralen (location 1) - Monday to Wednesday schedule
  (1, 1), (1, 2), (1, 3);

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
