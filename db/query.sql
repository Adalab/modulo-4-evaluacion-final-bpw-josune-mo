CREATE DATABASE simpsons;
USE simpsons;

CREATE TABLE personajes (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(50) NOT NULL,
apellido VARCHAR(50) NOT NULL,
ocupacion VARCHAR(100),
descripcion TEXT
);

CREATE TABLE capitulos (
id INT AUTO_INCREMENT PRIMARY KEY,
titulo VARCHAR(100) NOT NULL,
numero_episodio INT NOT NULL,
temporada INT NOT NULL,
fecha_emision DATE,
sinopsis TEXT
);

CREATE TABLE frases (
id INT AUTO_INCREMENT PRIMARY KEY,
texto TEXT NOT NULL,
marca_tiempo VARCHAR(10),
descripcion TEXT,
personaje_id INT,
FOREIGN KEY (personaje_id) REFERENCES personajes(id)
);

CREATE TABLE capitulos_personajes (
capitulo_id INT,
personaje_id INT,
PRIMARY KEY (capitulo_id, personaje_id),
FOREIGN KEY (capitulo_id) REFERENCES capitulos(id),
FOREIGN KEY (personaje_id) REFERENCES personajes(id)
);

INSERT INTO personajes (id, nombre, apellido, ocupacion, descripcion) VALUES
(1, 'Homer', 'Simpson', 'Nuclear Safety Inspector', 'El padre de la familia Simpson.'),
(2, 'Marge', 'Simpson', 'Ama de casa', 'La madre de la familia Simpson, conocida por su cabello azul.'),
(3, 'Bart', 'Simpson', 'Estudiante', 'El hijo travieso de Homer y Marge.'),
(4, 'Lisa', 'Simpson', 'Estudiante', 'La hija inteligente y activista de la familia.'),
(5, 'Maggie', 'Simpson', 'Bebé', 'La bebé de la familia, conocida por su chupete.');

INSERT INTO capitulos (id, titulo, numero_episodio, temporada, fecha_emision, sinopsis) VALUES
(1, 'Simpsons Roasting on an Open Fire', 1, 1, '1989-12-17', 'El primer episodio de la serie donde la familia Simpson celebra la Navidad.'),
(2, 'Bart Gets an F', 2, 2, '1990-10-11', 'Bart intenta pasar su examen de historia.'),
(3, 'Homer vs. Lisa and the 8th Commandment', 3, 2, '1990-01-06', 'Homer y Lisa discuten sobre la moralidad de robar cable.'),
(4, 'Marge vs. the Monorail', 12, 4, '1993-01-14', 'Marge se opone a la construcción de un monorraíl en Springfield.');

INSERT INTO frases (id, texto, marca_tiempo, descripcion) VALUES
(1, 'D''oh!', '00:00:05', 'Frase icónica de Homer Simpson.'),
(2, '¡Ay, caramba!', '00:00:10', 'Frase famosa de Bart Simpson.'),
(3, 'Mmm... donuts', '00:00:15', 'Homer expresa su amor por los donuts.'),
(4, 'Lisa, si puedes leer esto, es que estás en problemas.', '00:00:20', 'Una frase de Marge a Lisa.'),
(5, 'No tengo un problema con la bebida, tengo un problema sin la bebida.', '00:00:25', 'Una frase humorística de Homer.');

