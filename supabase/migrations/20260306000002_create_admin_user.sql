-- Create the admin user for the /admin panel
-- Email: n.karamo@protonmail.com  Password: abricleaning

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  new_user_id uuid := gen_random_uuid();
BEGIN
  -- Only insert if the user doesn't exist yet
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'n.karamo@protonmail.com') THEN

    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      new_user_id,
      'authenticated',
      'authenticated',
      'n.karamo@protonmail.com',
      extensions.crypt('abricleaning', extensions.gen_salt('bf')),
      now(),
      now(),
      now(),
      '', '', '', ''
    );

    -- Register the email identity so login works
    INSERT INTO auth.identities (
      provider_id,
      user_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      new_user_id::text,
      new_user_id,
      jsonb_build_object('sub', new_user_id::text, 'email', 'n.karamo@protonmail.com'),
      'email',
      now(),
      now(),
      now()
    );

  END IF;
END $$;
