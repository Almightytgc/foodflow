//uso de estado y referencia
import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
// comunicación entre react y backend
import axios from "axios";
//redirección
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
//alerta / notificaciones
import Swal from 'sweetalert2';
import { alertaAutenticacion } from '../../alerts';

export const CreateEmployeesForm = () => {

  const navigate = useNavigate();

  //recepción de datos del form
  const [names, setNombres] = useState("");
  const [lastNames, setApellidos] = useState("");
  const [phone, setTelefono] = useState("");
  const [mail, setCorreo] = useState("");
  const [user, setUsuario] = useState("");
  const [passWord, setContrasenia] = useState("");
  const [salario, setSalario] = useState("");
  const salarioFloat = parseFloat(salario);
  const [cargo, setCargo] = useState("");
  const cargoInt = parseInt(cargo);

  let camposVacios = false;

  //proteger ruta
  const adminLoggedStorage = localStorage.getItem("adminLogged");

  useEffect(() => {
      const loadAdminLoggedValue = () => {
          return adminLoggedStorage ? JSON.parse(adminLoggedStorage) : false;
      };

      const adminLoggedValue = loadAdminLoggedValue();
      // console.log("el admin está ", adminLoggedValue);
      if (!adminLoggedValue) {
          navigate("/authentication");
          return alertaAutenticacion();
      }
  }, []);


  //envío de datos del formm
  const registrarUsuario = async (e) => {
    e.preventDefault();

    if (names == "" || lastNames == "" || phone == "" || mail == "" || user == "" || passWord == "" || salario == "" || cargo == "") {
      camposVacios = true;
      Swal.fire({
        icon: 'error',
        iconColor: 'red',
        title: 'Campos vacíos',
        text: 'Por favor rellena todos los campos obligatorios',
        confirmButtonColor: '#249643',
        color: '##211B16'
      })
    }
    if (!camposVacios) {
      try {
        await axios.post("http://localhost:5000/admin/Employees/Create",
          {
            nombres: names,
            apellidos: lastNames,
            telefono: phone,
            correo: mail,
            usuario: user,
            contrasenia: passWord,
            salario: salarioFloat,
            rol: cargoInt
          });

        Swal.fire({
          titleText: `El usuario ha sido creado`,
          confirmButtonColor: "#F47228"
        });
        //redireccion
        navigate('/admin/Employees');
      } catch (error) {
        console.log(error);
      }
    }


  }


  //referencia a el input de la contraseña
  const inputRef = useRef(null);

  //ver contraseña
  const verContrasenia = () => {
    if (inputRef.current) {
      const passwordInput = inputRef.current;
      if (passwordInput.type === "password") {
        passwordInput.type = "text"
      } else {
        passwordInput.type = "password"
      }
    }
  }

  return (
    <>
      {/* contenedor general */}
      <div className="m-24 max-sm:m-10 bg-gray-100 rounded-2xl shadow-lg md:max-w-3xl p-3 flex items-center justify-center flex-col">
        {/* contenedor izquierdo */}
        <div className="md:w-full max-sm:px-8 px-16">
          <h2 className="font-bold text-3xl text-center text-black">
            Añadir personal
          </h2>
          <form onSubmit={registrarUsuario} className="flex flex-col gap-2">

            {/* Nombres y apellidos */}
            <div className='flex flex-row max-sm:flex-wrap'>
              <input
                className="p-2 mt-8 rounded-xl border w-1/2 max-sm:w-full mx-1 shadow-lg"
                type="text"
                name="nombres"
                placeholder="Nombres"
                value={names}
                onChange={(e) => setNombres(e.target.value)}
              ></input>

              <input
                className="p-2 mt-8 rounded-xl border w-1/2 max-sm:w-full mx-1 shadow-lg"
                type="text"
                name="apellidos"
                placeholder="Apellidos"
                value={lastNames}
                onChange={(e) => setApellidos(e.target.value)}
              ></input>
            </div>

            {/* telefono y fecha de nacimiento  */}
            <div className='flex flex-row max-sm:flex-wrap'>
              <input className="p-2 mt-8 rounded-xl border w-1/2 max-sm:w-full mx-1 shadow-lg"
                type="text"
                name="apellidos"
                placeholder="Telefono"
                value={phone}
                onChange={(e) => setTelefono(e.target.value)}
              >
              </input>

              <input
                className="p-2 mt-8 rounded-xl border w-1/2 max-sm:w-full mx-1 shadow-lg"
                type="email"
                name="nombres"
                placeholder="correo"
                value={mail}
                onChange={(e) => setCorreo(e.target.value)}
              ></input>
            </div>

            {/* correo y usuario */}
            <input
              className="p-2 my-8 rounded-xl  border w-full mx-1 shadow-lg"
              type="text"
              name="apellidos"
              placeholder="Usuario"
              value={user}
              onChange={(e) => setUsuario(e.target.value)}
            ></input>

            {/* contraseña */}
            <div className="relative">
              <input
                ref={inputRef}
                className="p-2 mt-2 rounded-xl w-full  border shadow-lg"
                type="password"
                name="password"
                id="inputPassword"
                placeholder="Contraseña"
                value={passWord}
                onChange={(e) => setContrasenia(e.target.value)}
              ></input>

              <svg onClick={verContrasenia}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fillRule="currentColor"
                className="bi bi-eye absolute top-1/4 translate-y-1/2 right-3 hover:scale-125 duration-300"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>

            <div className='flex flex-col gap-4'>
              <input
                className="p-2 mt-8 rounded-xl border w-full mx-1 shadow-lg"
                type="number"
                step='any'
                name="nombres"
                placeholder="Salario"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
              ></input>


              <div className='flex flex-col justify-center w-full text-center mx-2'>
                <label htmlFor="fechaNacimiento" className='text-sm text-[#211B16] font-bold'>Elegir Rol</label>
                <select name="" id="" className="shadow-lg p-2 mt-2 rounded-xl  border w-full mx-1 text-sm" value={cargo} onChange={(e) => setCargo(e.target.value)}>
                  <option value="" disabled>Seleccione un rol</option>
                  <option className='text-sm' value="2">Mesero</option>
                  <option className='text-sm' value="3">Chef</option>
                  <option className='text-sm' value="4">Admin</option>
                </select>
              </div>
            </div>



            <div className="flex flex-row w-full gap-2 justify-center items-center">

              {/* boton regresar */}
              <Link className="text-center w-1/2 bg-[#F47228] hover:bg-[#272424] hover:text-[#fff] rounded-xl text-white p-2 duration-500 my-5 font-bold" to={"/admin/Employees"}>
                <span className="font-bold">
                </span>Regresar
              </Link>

              {/* boton registrar */}
              <button className="w-1/2 bg-[#58764E] hover:bg-[#272424] hover:text-[#fff] rounded-xl text-white p-2 duration-500 my-5 font-bold">
                Registrar personal
              </button>

            </div>
          </form>
        </div>
      </div>


    </>
  );
}







