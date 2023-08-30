import useSwr, {useSWRConfig } from "swr"
import axios from "axios";

export const TablesUsed = () => {

    const {mutate} = useSWRConfig();

    const fetcher = async () => {
        const response = await axios.get("http://localhost:5000/staff/getTables");
        return response.data;
    }

    const { data } = useSwr("mesas", fetcher, {refreshInterval: 100});

    if (!data) {
        return <h2 className="text-white text-6xl">Cargando...</h2>;
    }


    const cambiarEstadoMesa = async (id_mesa) => {
        const response = axios.patch(`http://localhost:5000/staff/usedTables/${id_mesa}`);
        await mutate("mesas");
        return response.data;
    }
    return (
        <>
            <div className="md:w-4/3 px-16 flex flex-col justify-start items-start">
                <h1 className="border-[#58764E] border-b-4 py-2 w-[30%] max-sm:w-[50%] max-sm:text-2xl text-3xl my-8 font-bold text-[#F47228]" >Mesas ocupadas</h1>

                <p className="text-[#fff] font-bold  my-8 max-sm:text-justify  max-sm:text-2xl text-5xl">
                    Controle y Administre el estado en que se encuentran las mesas.
                </p>
            </div>

            <div className="overflow-x mx-auto w-3/4">
                <table className="auto w-full">
                    <thead className="text-center">
                        <tr className="text-center">
                            <th scope="col" className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4">#</th>
                            <th scope="col" className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4">Token de mesa</th>
                            <th scope="col" className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4">Usuario</th>
                            <th scope="col" className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">
                        {data.map((mesa, index) => {
                            return (
                                <tr key={mesa.id_mesa} className="text-center">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0]">{index + 1}</td>
                                    <td className="text-sm bg-[#1C1C1C] text-[#F0F0F0] font-light px-6 py-4 whitespace-nowrap">{mesa.token}</td>
                                    <td className="text-sm bg-[#1C1C1C] text-[#F0F0F0] font-light px-6 py-4 whitespace-nowrap">{mesa.usuario.nombres}</td>
                                    <td className="text-sm bg-[#1C1C1C] text-[#F0F0F0] font-light px-6 py-4 whitespace-nowrap">
                                        <button onClick={() => cambiarEstadoMesa(mesa.id_mesa)} className="bg-[#F47228] text-white text-center hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 font-bold w-full">
                                            <span className="font-bold">
                                                Marcar como desocupada
                                            </span> 
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}