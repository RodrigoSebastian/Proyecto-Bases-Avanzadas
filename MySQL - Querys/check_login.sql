USE gr_survey_service;

DROP PROCEDURE IF EXISTS Checar_Usuario;
DELIMITER //
CREATE PROCEDURE Checar_Usuario(IN _usuario TEXT, IN _password TEXT, OUT _aceptado BOOL)
    BEGIN
        IF((select count(*) from usuarios where usuario=_usuario and contrasenia=_password) > 0) THEN
            SET _aceptado = true;
        ELSE
            SET _aceptado = FALSE;
        END IF;
    END;
DELIMITER ;

SET @booleano = false;
CALL Checar_Usuario('torybolla','123',@booleano);
SELECT @booleano;
