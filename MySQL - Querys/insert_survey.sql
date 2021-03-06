USE gr_survey_service;

DROP PROCEDURE IF EXISTS Guardar_Cuestionario;
DELIMITER //
CREATE PROCEDURE Guardar_Cuestionario(IN _jsonA JSON)
    BEGIN
        DECLARE _json JSON;
        DECLARE _tempID INT DEFAULT 0;
        DECLARE _nombre VARCHAR(50);
        DECLARE _descripcion VARCHAR(200);
        DECLARE _cantidadPreguntas INT DEFAULT 0;
        DECLARE _cantidadRespuestas INT DEFAULT 0;
        DECLARE ind INT DEFAULT 0;
        DECLARE ind2 INT DEFAULT 0;
        DECLARE _preguntasJSON JSON;

        DECLARE _preguntasI VARCHAR(200);
        DECLARE _tipoPregunta INT DEFAULT 0;
        DECLARE _respuestasJSON JSON;

        DECLARE _respuestaI VARCHAR(100);
        DECLARE _respuestaCorrecta BOOL DEFAULT FALSE;

        SET _json = JSON_EXTRACT(_jsonA,'$[0]');

        SET _nombre = JSON_UNQUOTE(JSON_EXTRACT(_json,'$.nombre'));
        SET _descripcion = JSON_UNQUOTE(JSON_EXTRACT(_json,'$.descripcion'));
        SET _cantidadPreguntas = JSON_LENGTH(JSON_EXTRACT(_json,'$.preguntas'));
        SET _preguntasJSON = JSON_EXTRACT(_json,'$.preguntas');

#       SELECT _cantidadPreguntas,_preguntasJSON;
#       AQUI DEBO INSERTAR EN TABLA CUESTIONARIO
        
        IF ((select count(*) from cuestionario where nombre = _nombre and descripcion=_descripcion and cantidadPreguntas=_cantidadPreguntas) = 0) THEN
            insert into cuestionario values(0,_nombre,_descripcion,_cantidadPreguntas);
        END IF;

        select id into _tempID from cuestionario where nombre = _nombre and descripcion=_descripcion and cantidadPreguntas=_cantidadPreguntas;

        SET ind = 0;
        WHILE ind < _cantidadPreguntas DO
            SET _preguntasI = JSON_UNQUOTE(JSON_EXTRACT(_preguntasJSON,CONCAT('$[',ind,'].pregunta')));
            SET _tipoPregunta = JSON_UNQUOTE(JSON_EXTRACT(_preguntasJSON,CONCAT('$[',ind,'].tipo_pregunta')));
            SET _respuestasJSON = JSON_EXTRACT(_preguntasJSON,CONCAT('$[',ind,'].respuestas'));
            SET _cantidadRespuestas = JSON_LENGTH(JSON_EXTRACT(_preguntasJSON,CONCAT('$[',ind,'].respuestas')));

            IF ((select count(*) from preguntas where id = _tempID and numPregunta = ind) = 0) THEN
                INSERT INTO preguntas VALUES(0, _tempID,ind,_preguntasI,_tipoPregunta,_cantidadRespuestas);
                END IF;

            SET ind2 = 0;
            WHILE ind2 < _cantidadRespuestas DO
                SET _respuestaI = JSON_UNQUOTE(JSON_EXTRACT(_respuestasJSON,CONCAT('$[',ind2,'].respuesta')));
                SET _respuestaCorrecta = JSON_EXTRACT(_respuestasJSON,CONCAT('$[',ind2,'].opcion_correcta'));

                IF ((select count(*) from respuestas where idPregunta = ind and respuesta = _respuestaI) = 0) THEN
                    INSERT INTO respuestas VALUES(0, _tempID,ind,_respuestaI,_respuestaCorrecta);
                    END IF;

                SET ind2 = ind2 + 1;
                END WHILE;

            SET ind = ind + 1;
            END WHILE;
    END //

DELIMITER ;

CALL Guardar_Cuestionario('[
  {
    "nombre": "1",
    "descripcion": "1",
    "preguntas": [
      {
        "pregunta": "1",
        "tipo_pregunta": "2",
        "respuestas": [
          {
            "respuesta": "1",
            "opcion_correcta": true
          }
        ]
      },
      {
        "pregunta": "2",
        "tipo_pregunta": "3",
        "respuestas": [
          {
            "respuesta": "2",
            "opcion_correcta": false
          }
        ]
      }
    ]
  }
]');

CALL Guardar_Cuestionario('{"nombre":"Biolog??a molecular","descripcion":"Examen final de biolog??a molecular, es el valor del 50% del parcial.","preguntas":[{"pregunta":"??A qu?? categor??a pertenece el covid-19? (Si, no se que poner xd)","tipo_pregunta":"3","respuestas":[{"respuesta":"Pinchos :v","opcion_correcta":false},{"respuesta":"Gram positivas","opcion_correcta":false},{"respuesta":"Gram negativas","opcion_correcta":false},{"respuesta":"Adenovirus","opcion_correcta":false},{"respuesta":"Coronavirus","opcion_correcta":true}]},{"pregunta":"??A qu?? categor??a pertenece el covid-19?","tipo_pregunta":"2","respuestas":[{"respuesta":"Pinchos :v","opcion_correcta":false},{"respuesta":"Gram positivas","opcion_correcta":false},{"respuesta":"Coronavirus","opcion_correcta":true}]}]}');
CALL Guardar_Cuestionario('{"nombre":"Hello hello","descripcion":"Este es un cuestionario de tu sufrimiento pasado :v","preguntas":[{"pregunta":"Quien es el hello hello?","tipo_pregunta":"3","respuestas":[{"respuesta":"Hugo","opcion_correcta":false},{"respuesta":"Larre","opcion_correcta":false},{"respuesta":"Hello hello this is juk :v","opcion_correcta":true}]},{"pregunta":"Arboles de la barranca (continua la canci??n)","tipo_pregunta":"1","respuestas":[{"respuesta":"0","opcion_correcta":true}]},{"pregunta":"MySQL","tipo_pregunta":"2","respuestas":[{"respuesta":"Troy - SQL","opcion_correcta":true},{"respuesta":"TRoy","opcion_correcta":false},{"respuesta":"Arturoy","opcion_correcta":false},{"respuesta":"La sobrina","opcion_correcta":true},{"respuesta":"Cristo redentor","opcion_correcta":false}]},{"pregunta":"Tengo hambre?","tipo_pregunta":"3","respuestas":[{"respuesta":"Si","opcion_correcta":true},{"respuesta":"no","opcion_correcta":false}]},{"pregunta":"??Qui??n es kim? :v","tipo_pregunta":"1","respuestas":[{"respuesta":"0","opcion_correcta":true}]}]}');