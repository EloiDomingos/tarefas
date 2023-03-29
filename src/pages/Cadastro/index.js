import {useState} from 'react';
import {auth} from '../../firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Cadastro(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function fazerCadastro(e){
        e.preventDefault();

        if(email !== "" && senha !== ""){
            await createUserWithEmailAndPassword(auth, email, senha)
            .then(()=>{
                navigate('/admin', {replace: true})
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
            <h1>Cadastre-se</h1>
            <span>Crie sua conta</span>

            <form className="form" onSubmit={fazerCadastro}>
                <input type="text" placeholder="Digite o seu email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <input type="password" placeholder="Digite a sua senha" value={senha} onChange={(e)=> setSenha(e.target.value)}/>
                <button type="submit">Cadastrar</button>
            </form>

            <a href="/" className="button-link">Já possui conta ? Faça o login !</a>
        </div>
    )
}

export default Cadastro;