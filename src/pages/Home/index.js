import {useState} from 'react';
import './home.css';

import {auth} from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Home(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function fazerLogin(e){
        e.preventDefault();

        if(email !== "" && senha !== ""){

            await signInWithEmailAndPassword(auth, email, senha)
            .then(()=>{
                navigate('/admin', {replace:true})
            })
            .catch((error)=>{
                console.log("Erro" + error)
            })

        }else{
            alert("Preencha todos os campos !")
        }
    }

    return(
        <div className="home-container">
            <h1>Lista de Tarefas</h1>
            <span>Gerencie suas tarefas</span>

            <form className="form" onSubmit={fazerLogin}>
                <input type="text" placeholder="Digite o seu email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <input type="password" placeholder="Digite a sua senha" value={senha} onChange={(e)=> setSenha(e.target.value)}/>
                <button type="submit">Acessar</button>
            </form>

            <a href="/cadastro" className="button-link">Não possui conta ? Cadastre-se</a>
        </div>
    )
}

export default Home;