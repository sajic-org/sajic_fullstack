CREATE TABLE user (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(45) NOT NULL,
    isAluno TINYINT NOT NULL,
    isAdmin TINYINT NOT NULL
);

CREATE TABLE palestrante (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    sobre TEXT NOT NULL,
    imagem VARCHAR(255) NOT NULL
);

CREATE TABLE sala (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero VARCHAR(45) NOT NULL,
    capacidade INT NOT NULL
);

CREATE TABLE palestra (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    horario DATETIME NOT NULL,
    sala_id INT NOT NULL,
    palestrante_id INT NOT NULL,
    area ENUM('TI', 'GESTAO') NOT NULL,
    FOREIGN KEY (sala_id) REFERENCES sala(id),
    FOREIGN KEY (palestrante_id) REFERENCES palestrante(id)
);

CREATE TABLE user_has_palestra (
    user_Id INT NOT NULL,
    palestra_id INT NOT NULL,
    PRIMARY KEY (user_Id, palestra_id),
    FOREIGN KEY (user_Id) REFERENCES user(Id),
    FOREIGN KEY (palestra_id) REFERENCES palestra(id)
);
