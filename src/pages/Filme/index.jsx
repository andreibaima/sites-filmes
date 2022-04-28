
import { useEffect, useState } from 'react';
import './filme.css';
import { useParams, useHistory } from 'react-router-dom'
import api from '../../services/api';
import { toast } from 'react-toastify';

function Filme() {

    const { id } = useParams();
    const [filme, setFilme] = useState([]);
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            const response = await api.get(`r-api/?api=filmes/${id}`);

            if (response.data.length === 0) {
                history.replace('/');
                return;
            }

            setFilme(response.data);
            setLoading(false);
        }

        loadFilme();

        return () => {
            console.log("Componente desmonatado");
        }

    }, [history, id])

    function salvaFime() {

        const minhaLista = localStorage.getItem('filmes');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some ( (filmeSalvo) => filmeSalvo.id === filme.id)

        if (hasFilme ) {
            toast.info('Você já possui esse filme salvo')
            return
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos))

        toast.success('Salvo com sucesso!')

    }

    if (loading) {
        return (
            <div className='filme-info'>
                <h1>Carregando seu filme...</h1>
            </div>
        )
    }

    return (
        <div className='filme-info'>
            <h1> {filme.nome} </h1>
            <img src={filme.foto} alt={filme.nome} />

            <h3>Sinopse</h3>
            {filme.sinopse}

            <div className='botoes'>
                <button onClick={ salvaFime }> Salvar </button>
                <button>
                    <a target="_blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;