const regexName = /^[/^[a-zA-Z]+$/;
//const regex = ;

export function validateForm(input) {
    let errors = {};
  
    // NAME
    if (!input.name) errors.name = "El nombre es requerido";
	else if (input.name.length > 18)
		errors.name = "El nombre es demasiado largo";
	else if (!regexName.test(input.name))
		errors.name = "El nombre debe ser  válido";
  
    // WEIGHTS
    if (!input.weight_min) {
      // weight min
      errors.weight_min = "Please enter valid Weight";
    } else if (!/\d{1,2}/.test(input.weight_min)) {
      errors.weight_min = "you must input numbers. Example: '10'";
    } else {
      errors.weight_min = "";
    }
    if (!input.weight_max) {
      // weight max
      errors.weight_max = "Type a valid weight ";
    } else if (!/\d{1,2}/.test(input.weight_max)) {
      errors.weight_max = "you must input numbers. Example: '15'";
    } else {
      errors.weight_max = "";
    }
    // HEIGHTS
    if (!input.height_min) {
      // height min
      errors.height_min = "Type a valid  height ";
    } else if (!/\d{1,2}/.test(input.height_min)) {
      errors.height_min = "you must input numbers. Example: '10'";
    } else {
      errors.height_min = "";
    }
    if (!input.height_max) {
      // height max
      errors.height_max = "Type a valid height ";
    } else if (!/\d{1,2}/.test(input.height_max)) {
      errors.height_max = "You must input numbers. Example: '10'";
    } else {
      errors.height_max = "";
    }

  //   if (!input.life_span) errors.name = "ingresa los años de vida";
	// else if (input.life_span.length > 11)
	// 	errors.life_span = "deben ser numeros";
	// else if (!regexLife.test(input.lifespan))
	// 	errors.name = "Debes ingresar un dato valido;
    return errors;
  }