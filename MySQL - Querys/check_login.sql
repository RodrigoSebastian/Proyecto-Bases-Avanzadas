USE gr_survey_service;

DROP PROCEDURE IF EXISTS Checar_Usuario;
DELIMITER //
CREATE PROCEDURE Checar_Usuario(IN _json JSON)
    BEGIN
        DECLARE _usuario VARCHAR(50);
        DECLARE _password VARCHAR(50);

        SET _usuario = JSON_UNQUOTE(JSON_EXTRACT(_json,'$.usuario'));
        SET _password = JSON_UNQUOTE(JSON_EXTRACT(_json,'$.contrasenia'));

        select count(*) as 'Count' from usuarios where usuario=_usuario and contrasenia=_password;
    END;
DELIMITER ;

# SET @booleano = false;
CALL Checar_Usuario('{"usuario":"torybolla","contrasenia":"123"}');
# SELECT @booleano;
