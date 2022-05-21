INSERT INTO role(id, role) VALUES (1, 'ROLE_ADMIN'), (2, 'ROLE_USER')
    ON CONFLICT (id) DO NOTHING;

INSERT INTO app_user(id, created, password, username, role_id)
        VALUES (1, CURRENT_TIMESTAMP, '$2a$10$f9yeu/iBCIN7hohTJdLrgeFVZO200Mxeac3c2x.RuXCKHycQKFLJi', 'recipeAdmin', 1)
    ON CONFLICT (id) DO NOTHING;