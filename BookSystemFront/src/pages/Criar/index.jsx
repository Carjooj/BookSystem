import Button from "../../components/global/Button";
import EstruturaPagina from "../../components/global/EstruturaPagina";
import Input from "../../components/global/Input";
import TopoPagina from "../../components/global/TopoPagina";
import styles from './styles.module.css'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Assunto from "../../components/global/Assunto";
import Modal from "../../components/global/Modal";
import ModalPorta from "../../components/ModalPorta";
import ModalScan from "../../components/ModalScan";
import { arrayToString } from "../../../public/js/scanTag";

export default function Criar() {

    const [arquivo, setArquivo] = useState("")
    const [modalSelecionado, setModalSelecionado] = useState(null)
    const [porta, setPorta] = useState()
    const [tipoModal, setTipoModal] = useState("conectar")
    const [uid, setUid] = useState([])

    let array = []

    console.log(uid)

    useEffect(() => {
        if (typeof porta === "object") {
            setModalSelecionado("escanear")
            setTipoModal("escanear")
        }
    }, [porta])


    function handleArquivo(e) {
        setArquivo(URL.createObjectURL(e.target.files[0]))
    }

    let pesquisar = [
        { valor: "livre", texto: "Termo livre" },
        { valor: "titulo", texto: "Título" },
        { valor: "isbn", texto: "ISBN" },
        { valor: "autor", texto: "Autor" },
        { valor: "editora", texto: "Editora" },
        { valor: "assunto", texto: "Assunto" }
    ]


    return (
        <EstruturaPagina>
            <TopoPagina
                titulo="Criar um livro"
                subtitulo="Preencha corretamente os campos para criar um livro"
                link="/gerenciamento"
            />

            <form className={styles.containerArea}>

                <div className={styles.form}>
                    <div className={styles.blocoInput}>
                        <label htmlFor="tituloSubtitulo">Título e subtítulo</label>
                        <Input name="tituloSubtitulo" id="tituloSubtitulo" />
                    </div>
                    <div className={styles.blocoInput}>
                        <label htmlFor="autor">Autor</label>
                        <Input name="autor" id="autor" />
                    </div>
                    <div className={styles.blocoInput}>
                        <label htmlFor="editora">Editora</label>
                        <Input name="editora" id="editora" />
                    </div>

                    <div className={styles.blocoInput2}>
                        <div className={styles.blocoInput}>
                            <label htmlFor="ano">Ano</label>
                            <Input type="number" name="ano" id="ano" />
                        </div>

                        <div className={styles.blocoInput}>
                            <label htmlFor="edicao">Edição</label>
                            <Input type="number" name="edicao" id="edicao" />
                        </div>

                        <div className={styles.blocoInput}>
                            <label className={styles.label} htmlFor="nPaginas">N° de páginas</label>
                            <Input type="number" name="nPaginas" id="nPaginas" />
                        </div>

                    </div>

                    <div className={styles.blocoInput}>
                        <label htmlFor="assuntos">Assuntos</label>
                        <div className={styles.blocoInput2}>
                            <div className={styles.container}>
                                <select className={styles.select}>
                                    <option selected disabled>Selecione</option>
                                    {pesquisar.map((assunto, i) => {
                                        return (
                                            <option key={i} value={assunto.valor}>{assunto.texto}</option>
                                        )
                                    })}
                                </select>
                                <div className={styles.icon}>
                                    <span className="material-symbols-outlined">expand_more</span>
                                </div>
                            </div>
                            <Button tipoBotao="primario">
                                Adicionar
                            </Button>
                        </div>
                        <div className={styles.areaAssunto}>
                            <Assunto fechavel={true}>
                                <p>Literatura estrangeira</p>
                            </Assunto>
                        </div>
                    </div>

                </div>

                <div className={styles.form}>
                    <div className={styles.blocoInput}>
                        <label htmlFor="etiqueta">Etiqueta</label>
                        <div className={styles.blocoInput2}>
                            <Input name="etiqueta" id="etiqueta" value={arrayToString(uid)} disabled />
                            <Button tipoBotao="primario" type="button" onClick={() => setModalSelecionado(tipoModal)}>
                                Escanear
                            </Button>
                        </div>

                    </div>
                    <div className={styles.blocoInput}>
                        <label htmlFor="isbn">ISBN</label>
                        <Input name="isbn" id="isbn" />
                    </div>
                    <div className={styles.blocoInput2 + " " + styles.imagemArea}>
                        <div className={styles.blocoInput}>
                            <label>Carregar imagem do livro</label>
                            <label htmlFor="imagemLivro" className={styles.inputFile}>
                                <span className="material-symbols-outlined">add_a_photo</span>
                            </label>
                            <input className={styles.inputFile} type="file" name="imagemLivro" id="imagemLivro" onChange={(e) => handleArquivo(e)} />
                        </div>
                        <div className={styles.blocoInput + " " + styles.imagem}>
                            <img src={arquivo} alt="Imagem do livro a ser carregada" />
                        </div>

                    </div>

                    <div className={styles.blocoInput2}>
                        <div className={styles.blocoInput}>
                            <Button tipoBotao="terciarioCancela" type="button">
                                <Link to="/gerenciamento">Cancelar</Link>
                            </Button>
                        </div>
                        <div className={styles.blocoInput}>
                            <Button tipoBotao="primario">Criar livro</Button>
                        </div>
                    </div>
                </div>

            </form>
            <Modal aberto={modalSelecionado === 'conectar'} fechar={setModalSelecionado} titulo={'Selecione a porta de comunicação'}>
                <ModalPorta funcao={setPorta} porta={porta} />
            </Modal>
            <Modal aberto={modalSelecionado === 'escanear'} fechar={setModalSelecionado} titulo={'Escanear a Tag RFID'}>
                <ModalScan porta={porta} dados={setUid} />
            </Modal>
        </EstruturaPagina>
    )
}