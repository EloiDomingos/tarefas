import { useState, useEffect } from 'react';
import './admin.css';
import {auth, db} from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';

function Admin(){

    const [tarefa, setTarefa] = useState("");
    const [user, setUser] = useState({});
    const [trf, setTrf] = useState([]);
    const [edit, setEdit] = useState({});

    useEffect(()=>{
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@detaillUser");
            setUser(JSON.parse(userDetail))

            if(userDetail){
                const data = JSON.parse(userDetail);

                const tarefaRef = collection(db, "tarefas")
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))

                const unsub = onSnapshot(q, (snapshot)=>{

                    let lista = [];

                    snapshot.forEach((doc)=> {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })

                    setTrf(lista);

                })
            }
        }

        loadTarefas();

    }, [])


    async function criandoTarefas(e){
        e.preventDefault();

        if(tarefa === ""){
            alert("Digite sua tarefa");
            return;
        }

        if(edit?.id){
            atualizaTarefa();
            return;
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefa,
            created: new Date(),
            userUid: user?.uid
        })
        .then(()=>{
            console.log("Tarefa registrada");
            setTarefa("");
        })
        .catch((error)=>{
            console.log("Erro ao cadastrar tarefa" + error)
        })

    }


    async function sairTarefa(){
        await signOut(auth);
    }


    async function deletarTarefa(id){
        
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef);
    }

    function editarTarefa(item){
        setTarefa(item.tarefa);
        setEdit(item);
    }

    async function atualizaTarefa(){
        const docRef = doc(db, "tarefas", edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefa
        })
        .then(()=>{
            console.log("Tarefa atualizada");
            setTarefa("");
            setEdit({});
        })
        .catch((error)=>{
            console.log("Erro ao atualizar" + error);
            setTarefa("");
            setEdit({});
        })
    }

    return(
        <div className='admin-container'>
            <h1>Minhas tarefas</h1>

            <form className="form" onSubmit={criandoTarefas}>
                <textarea placeholder="Digite a sua tarefa"
                value={tarefa} onChange={(e)=> setTarefa(e.target.value)}/>

                {Object.keys(edit).length > 0 ? (
                    <button className="btn-tarefa" type='submit'>Atualizar tarefa</button>
                ) : (
                    <button className="btn-tarefa" type='submit'>Criar tarefa</button>
                )}
            </form>

            {trf.map((item)=>(
                <article key={item.id} className="list">
                <p>{item.tarefa}</p>

                <div>
                    <button onClick={()=> editarTarefa(item)}>Editar</button>
                    <button onClick={()=> deletarTarefa(item.id)} className="btn-concluir">Concluir</button>
                </div>
            </article>
            ))}

            <button className="btn-sair" onClick={sairTarefa}>Sair</button>
            
        </div>
    )
}

export default Admin;