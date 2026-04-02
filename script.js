// script.js

// 1️⃣ Inicializar Supabase
const SUPABASE_URL = "https://beskvtpqslbdgxpaykpr.supabase.co";
const SUPABASE_KEY = "sb_publishable_XRusyph2RQyJj9t8Y0gl6w_nsf5w_dK";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2️⃣ Función para formatear fechas (dd/mm/aa)
function formatearFecha(fecha) {
  if (!fecha) return "";
  const d = new Date(fecha);
  if (isNaN(d)) return "";
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = String(d.getFullYear()).slice(-2);
  return `${dia}/${mes}/${ano}`;
}

// 3️⃣ Capturar el submit del formulario
document.getElementById("myForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const tipoSeleccionado = document.querySelector('input[name="tipoDoc"]:checked');
  if (!tipoSeleccionado) {
    alert("Selecciona un tipo de documento");
    return;
  }

  // 4️⃣ Recoger los datos del formulario
  const datos = {
    fecha: formatearFecha(new Date()),
    nombre: document.getElementById("nombre").value,
    apellidos: document.getElementById("apellidos").value,
    tipoDoc: tipoSeleccionado.value,
    numeroDoc: document.getElementById("numeroDoc").value,
    fechaNacimiento: formatearFecha(document.getElementById("fechaNacimiento").value),
    nacionalidad: document.getElementById("nacionalidad").value,
    paisResidencia: document.getElementById("paisResidencia").value,
    provincia: document.getElementById("provincia").value,
    municipio: document.getElementById("municipio").value,
    codigoPostal: document.getElementById("codigoPostal").value,
    direccion: document.getElementById("direccion").value,
    telefono: document.getElementById("telefono").value,
    email: document.getElementById("email").value,
    parentesco: document.getElementById("parentesco").value,
    comComerciales: document.getElementById("autorizo").checked ? "Sí" : "No"
  };

  // 5️⃣ Guardar los datos en Supabase
  const { data, error } = await supabase
    .from('REGISTRE')
    .insert([datos]);

  if (error) {
    alert("Error al guardar en Supabase: " + error.message);
  } else {
    alert("Registro guardado correctamente");
    this.reset();
    window.location.href = "data.html"; // redirigir a la página de datos
  }
});