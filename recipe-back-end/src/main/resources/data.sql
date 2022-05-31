SET DATABASE SQL SYNTAX MYS TRUE

REPLACE INTO role(id, role) VALUES (1, 'ROLE_USER'), (2, 'ROLE_ADMIN')

REPLACE INTO app_user(id, created, password, username, role_id) VALUES (1, CURRENT_TIMESTAMP, '$2a$10$f9yeu/iBCIN7hohTJdLrgeFVZO200Mxeac3c2x.RuXCKHycQKFLJi', 'recipeAdmin', 2)