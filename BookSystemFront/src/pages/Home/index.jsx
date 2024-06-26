import { useState } from 'react'
import styles from './styles.module.css'
import EstruturaPagina from '../../components/global/EstruturaPagina'
import Select from '../../components/global/Select'
import Input from '../../components/global/Input'
import Button from '../../components/global/Button'
import Status from '../../components/global/Status'
import { Link } from "react-router-dom"
import TopoPagina from '../../components/global/TopoPagina'
import Modal from '../../components/global/Modal'
import DetalhesLivro from '../../components/global/DetalhesLivro'
import ExcluirLivro from '../../components/global/ExcluirLivro'
import Assunto from '../../components/global/Assunto'

export default function Home() {
    const [pesquisa, setPesquisa] = useState("")
    const [indiceSelecionado, setIndiceSelecionado] = useState(null)
    const [modalSelecionado, setModalSelecionado] = useState(null)
    const [sort, setSort] = useState("arrow_upward_alt")


    const dados = [
        {
            "id": 1,
            "titulo": "Orgulho e Preconceito",
            "autor": "Jane Austen",
            "editora": "Martin Claret",
            "ano": "2012",
            "etiqueta": "A3A73F25",
            "assuntos": [
                {
                    "id": 1,
                    "assunto": "Literatura estrangeira"
                },
                {
                    "id": 2,
                    "assunto": "Romance"
                }
            ],
            "status": "Disponível",
        },
        {
            "id": 2,
            "titulo": "Java®: Como Programar",
            "autor": "Paul Deitel",
            "editora": "Pearson Universidades",
            "ano": "2016",
            "etiqueta": "F3DA9D0E",
            "assuntos": [
                {
                    "id": 3,
                    "assunto": "Programação"
                }
            ],
            "status": "Indisponível",
        }
    ]

    let pesquisar = [
        { valor: "titulo", texto: "Título" },
        { valor: "isbn", texto: "ISBN" },
        { valor: "autor", texto: "Autor" },
        { valor: "editora", texto: "Editora" },
        { valor: "assunto", texto: "Assunto" }
    ]

    let ordenar = [
        { valor: "titulo", texto: "Título" },
        { valor: "autor", texto: "Autor" },
        { valor: "editora", texto: "Editora" }
    ]


    const [lista, setLista] = useState(dados)

    const handlePesquisar = () => {
        pesquisa.length ? setLista(
            dados.filter(item =>
                item.titulo.toLowerCase().includes(pesquisa.toLowerCase()) ||
                item.autor.toLowerCase().includes(pesquisa.toLowerCase()) ||
                item.editora.toLowerCase().includes(pesquisa.toLowerCase()) ||
                item.ano.toLowerCase().includes(pesquisa.toLowerCase())
            )
        ) : setLista(dados)
    }


    const handleSelecionar = (indice) => {
        if (indiceSelecionado == indice) {
            setIndiceSelecionado(null)
        } else {
            setIndiceSelecionado(indice)
        }
    }

    function handleSort() {
        if (sort === "arrow_upward_alt") {
            setSort("arrow_downward_alt")
        } else {
            setSort("arrow_upward_alt")
        }
    }

    return (
        <EstruturaPagina>

            <TopoPagina titulo="Gerenciamento" />

            <div className={styles.barraOpcoes}>
                <div className={styles.containerPesquisa}>
                    <div className={styles.blocoPesquisa + " " + styles.areaPesquisa}>
                        <Input className={styles.barraPesquisa} placeholder='Pesquisar' />
                        <Button tipoBotao="primario" onClick={handlePesquisar}>
                            <span className="material-symbols-outlined">search</span>

                        </Button>
                    </div>
                    <div className={styles.blocoFiltro}>
                        <div>
                            <label htmlFor='pesquisarPor' className={styles.selectLabel}>Pesquisar por</label>
                            <Select name={"pesquisarPor"} opcoes={pesquisar} />
                        </div>
                        <div>
                            <label htmlFor='filtrarPor' className={styles.selectLabel}>Filtrar por</label>
                            <Select name='filtrarPor' opcoes={ordenar} />
                        </div>
                        <Input className={styles.barraAno} placeholder='Ano' />
                        <Button icone={sort} onClick={() => handleSort()}>
                            <span className='material-symbols-outlined'>sort</span>
                        </Button>
                    </div>
                </div>
                <span className={styles.linha} />
                <div className={styles.containerBotoes}>

                    <Link to="/novoemprestimo">
                        <Button tipoBotao="primario">
                            <p>Novo empréstimo</p>
                        </Button>
                    </Link>


                    <div className={styles.areaBotoes}>
                        <Link to="/criar">
                            <Button icone="add" tipoBotao="primario">
                                <p className={styles.action}>Criar</p>
                            </Button>
                        </Link>
                        <Button tipoBotao="secundario" icone="info" onClick={() => setModalSelecionado('detalhes')} disabled={indiceSelecionado === null}>
                            <p className={styles.action}>Detalhes</p>
                        </Button>
                        <Link to="/editar">
                            <Button tipoBotao="secundario" icone="edit_square" disabled={indiceSelecionado === null}>
                                <p className={styles.action}>Editar</p>
                            </Button>
                        </Link>
                        <Button tipoBotao="secundario" icone="delete" onClick={() => setModalSelecionado('excluir')} disabled={indiceSelecionado === null}>
                            <p className={styles.action}>Excluir</p>
                        </Button>
                    </div>

                </div>
            </div>
            <div className={styles.containerCartoes}>
                {lista.map((item, i) => (

                    <div className={indiceSelecionado == i ? styles.cartaoSelecionado : styles.cartaoNaoSelecionado} onClick={() => handleSelecionar(i)} key={i}>

                        <div className={styles.imagemCartao}>
                            <img alt={`Foto do livro ${item.titulo}`} />
                        </div>
                        <div className={styles.areaConteudoCartao}>
                            <div className={styles.areaTexto}>
                                <h2 className={styles.tituloSecundario}>{item.titulo}</h2>
                                <div className={styles.areaBotoes}>

                                    <div className={styles.grupoTexto}>
                                        <p className={styles.paragrafo}>Autor:</p>
                                        <span className={styles.destaque}>{item.autor}</span>

                                        <p className={styles.paragrafo}><span className={styles.linhaHorizontal} /></p>
                                    </div>

                                    <div className={styles.grupoTexto}>
                                        <p className={styles.paragrafo}>Editora:</p>
                                        <span className={styles.destaque}>{item.editora}</span>

                                        <p className={styles.paragrafo}><span className={styles.linhaHorizontal} /></p>
                                    </div>

                                    <div className={styles.grupoTexto}>
                                        <p className={styles.paragrafo}>Ano:</p>
                                        <span className={styles.destaque}>{item.ano}</span>
                                    </div>

                                    <div className={styles.grupoTexto}>
                                        <p className={styles.paragrafo}>Etiqueta:</p>
                                        <span className={styles.destaque}>{item.etiqueta}</span>
                                    </div>


                                </div>
                            </div>
                            <div className={styles.areaBotoes}>
                                {item.assuntos.map((assunto, i) => (
                                    <Assunto key={i}><p>{assunto.assunto}</p></Assunto>
                                ))}
                            </div>
                        </div>
                        <Status status={item.status} />
                    </div>
                ))}
            </div>
            <Modal aberto={modalSelecionado === 'detalhes'} fechar={setModalSelecionado}
                backdropClose={setModalSelecionado} titulo={'Detalhes do livro'}>
                <DetalhesLivro />
            </Modal>
            <Modal aberto={modalSelecionado === 'excluir'} fechar={setModalSelecionado}
                backdropClose={setModalSelecionado} titulo={'Excluir livro'}>
                <ExcluirLivro />
            </Modal>

        </EstruturaPagina>
    )
}

/*
 const handleSelecionar = (indice) => {
        if (indiceSelecionado == indice) {
            setSelecionado(!selecionado)
        }
        setIndiceSelecionado(indice)
    } // <div className={selecionado && indiceSelecionado == i ? 
    styles.cartaoSelecionado : styles.cartaoNaoSelecionado} onClick={() => handleSelecionar(i)} key={i}>

    



*/
