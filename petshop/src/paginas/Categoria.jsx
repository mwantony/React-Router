import React, { useEffect, useState } from "react";
import ListaCategorias from "../components/ListaCategorias";
import "../assets/css/blog.css";
import ListaPost from "../components/ListaPost";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import { busca } from "../api/api";
import SubCategoria from "./SubCategoria";
import { Switch } from "react-router-dom";
const Categoria = () => {
  const { id } = useParams();
  const { url, path } = useRouteMatch();
  console.log(path)
  const [subcategorias, setSubCategorias] = useState([]);

  useEffect(() => {
    busca(`/categorias/${id}`, (categoria) => {
      setSubCategorias(categoria.subcategorias);
    });
  }, [id]);
  return (
    <>
      <div className="container">
        <h2 className="titulo-pagina">Pet Notícias</h2>
      </div>
      <ListaCategorias></ListaCategorias>
      <ul className="lista-categorias container flex">
        {subcategorias.map((subcategoria) => {
          return <li
            className={`lista-categorias__categoria lista-categorias__categoria--${id}`}
            key={subcategoria}
          >
            {" "}
            <Link to={`${url}/${subcategoria}`}>{subcategoria}</Link>
          </li>
        })}
      </ul>
      <Switch>
        <Route exact path={`${path}`}>
          <ListaPost url={`/posts?categoria=${id}`}></ListaPost>
        </Route>
        <Route path={`${path}/:subcategoria}`}>
          <SubCategoria></SubCategoria>
        </Route>
      </Switch>
    </>
  );
};

export default Categoria;
