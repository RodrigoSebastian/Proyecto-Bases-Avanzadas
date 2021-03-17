#create database GR_Survey_Service;
USE gr_survey_service;

DROP TABLE IF EXISTS Cuestionario;
CREATE TABLE Cuestionario
(
    id                int          NOT NULL AUTO_INCREMENT,
    nombre            varchar(50)  NOT NULL,
    descripcion       varchar(200) NOT NULL,
    cantidadPreguntas int          NOT NULL,

    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS Preguntas;
CREATE TABLE Preguntas
(
    id                 int          NOT NULL,
    numPregunta        int          NOT NULL,
    pregunta           varchar(200) NOT NULL,
    tipo_respuesta     int          NOT NULL,
    cantidad_respuesta int          NOT NULL,

    FOREIGN KEY (id) REFERENCES Cuestionario(id)
);

DROP TABLE IF EXISTS Respuestas;
CREATE TABLE Respuestas
(
    idCuestionario  int          NOT NULL,
    idPregunta      int          NOT NULL,
    respuesta       varchar(100) NOT NULL,
    opcion_correcta int          NOT NULL,

    FOREIGN KEY (idCuestionario) REFERENCES Cuestionario (id)
);

DROP TABLE IF EXISTS Usuarios;
CREATE TABLE Usuarios
(
    id          int         NOT NULL AUTO_INCREMENT,
    usuario     varchar(50) NOT NULL,
    contrasenia varchar(50) NOT NULL,
    nombre      varchar(50) NOT NULL,

    PRIMARY KEY (id)
);

INSERT INTO usuarios VALUES
(0,'torybolla','123','Rodrigo'),
(0,'gaby','123','Gabriela');
