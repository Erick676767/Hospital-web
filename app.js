// Variables para controlar si ya se registró al menos un dato por sección
let pacienteRegistrado = false;
let citaRegistrada = false;

// Validar Inicio de Sesión
function iniciarSesion() {
  const usu = document.getElementById('usuario').value.trim();
  const pass = document.getElementById('password').value.trim();

  if (usu === 'administrador' && pass === '12345') {
    // Habilitar solo Pacientes al iniciar sesión
    document.getElementById('btn-pacientes').disabled = false;
    cambiarPestaña('pacientes');
  } else {
    alert('Usuario o contraseña incorrectos.');
  }
}

// Cerrar Sesión / Salir
function cerrarSesion() {
  document.getElementById('usuario').value = '';
  document.getElementById('password').value = '';

  // Resetear estados
  pacienteRegistrado = false;
  citaRegistrada = false;

  // Bloquear pestañas
  document.getElementById('btn-pacientes').disabled = true;
  document.getElementById('btn-citas').disabled = true;
  document.getElementById('btn-medicinas').disabled = true;

  cambiarPestaña('login');
}

// Cambiar entre pestañas
function cambiarPestaña(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  document.getElementById('btn-' + tabId).classList.add('active');
}

// Agregar Paciente a la Tabla
function agregarPaciente() {
  const dni = document.getElementById('dni').value.trim();
  const nombres = document.getElementById('nombres').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const edad = document.getElementById('edad').value.trim();

  if (dni === '' || nombres === '' || telefono === '' || edad === '') {
    alert('Por favor complete todos los campos del paciente.');
    return;
  }

  const tabla = document.getElementById('tablaPacientes');
  tabla.innerHTML += `<tr><td>${dni}</td><td>${nombres}</td><td>${telefono}</td><td>${edad}</td></tr>`;

  document.getElementById('dni').value = '';
  document.getElementById('nombres').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('edad').value = '';

  // Marcar como registrado y habilitar pestaña de Citas
  pacienteRegistrado = true;
  document.getElementById('btn-citas').disabled = false;
}

// Función del botón Siguiente en Pacientes
function siguienteDesdePacientes() {
  const dni = document.getElementById('dni').value.trim();
  const nombres = document.getElementById('nombres').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const edad = document.getElementById('edad').value.trim();

  // Si hay datos en los cuadros pero aún no presionó "Agregar a la Tabla"
  if (dni !== '' && nombres !== '' && telefono !== '' && edad !== '') {
    agregarPaciente();
    cambiarPestaña('citas');
  } else if (pacienteRegistrado) {
    // Si los cuadros están vacíos pero ya registró al menos a un paciente previamente
    cambiarPestaña('citas');
  } else {
    alert('Por favor complete los campos y registre al menos un paciente para continuar.');
  }
}

// Agregar Cita a la Tabla
function agregarCita() {
  const codCita = document.getElementById('codCita').value.trim();
  const codPaciente = document.getElementById('codPaciente').value.trim();
  const especialidad = document.getElementById('especialidad').value.trim();
  const fecha = document.getElementById('fecha').value.trim();

  if (codCita === '' || codPaciente === '' || especialidad === '' || fecha === '') {
    alert('Por favor complete todos los campos de la cita.');
    return;
  }

  const tabla = document.getElementById('tablaCitas');
  tabla.innerHTML += `<tr><td>${codCita}</td><td>${codPaciente}</td><td>${especialidad}</td><td>${fecha}</td></tr>`;

  document.getElementById('codCita').value = '';
  document.getElementById('codPaciente').value = '';
  document.getElementById('especialidad').value = '';
  document.getElementById('fecha').value = '';

  // Marcar como registrada y habilitar pestaña de Medicinas
  citaRegistrada = true;
  document.getElementById('btn-medicinas').disabled = false;
}

// Función del botón Siguiente en Citas
function siguienteDesdeCitas() {
  const codCita = document.getElementById('codCita').value.trim();
  const codPaciente = document.getElementById('codPaciente').value.trim();
  const especialidad = document.getElementById('especialidad').value.trim();
  const fecha = document.getElementById('fecha').value.trim();

  if (codCita !== '' && codPaciente !== '' && especialidad !== '' && fecha !== '') {
    agregarCita();
    cambiarPestaña('medicinas');
  } else if (citaRegistrada) {
    cambiarPestaña('medicinas');
  } else {
    alert('Por favor complete los campos y registre al menos una cita para continuar.');
  }
}

// Agregar Medicina a la Tabla
function agregarMedicina() {
  const cod = document.getElementById('codMed').value.trim();
  const nom = document.getElementById('nomMed').value.trim();
  const stock = document.getElementById('stockMed').value.trim();
  const precio = document.getElementById('precioMed').value.trim();

  if (cod === '' || nom === '' || stock === '' || precio === '') {
    alert('Por favor complete todos los campos de la medicina.');
    return;
  }

  const tabla = document.getElementById('tablaMedicinas');
  tabla.innerHTML += `<tr><td>${cod}</td><td>${nom}</td><td>${stock}</td><td>${precio}</td></tr>`;

  document.getElementById('codMed').value = '';
  document.getElementById('nomMed').value = '';
  document.getElementById('stockMed').value = '';
  document.getElementById('precioMed').value = '';
}