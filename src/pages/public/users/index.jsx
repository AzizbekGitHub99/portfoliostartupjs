import ReactPaginate from "react-paginate";
import ClientsCard from "../../../components/card/clients";

import "./style.scss";
import { useGetClientsQuery } from "../../../redux/query/clients";
import { useState } from "react";
const ClientUsersPage = () => {
  const [page, setPage] = useState(0)

  const {data, isFetching} = useGetClientsQuery(page)
  const clients = data?.data
  const total = Math.ceil(data?.pagination?.total / 10)

  const handlePageClick = ({selected}) =>{
    setPage(selected + 1)
  }
  const pagination = (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next"
      onPageChange={handlePageClick}
      pageRangeDisplayed={2}
      pageCount={total}
      previousLabel="Previous"
      renderOnZeroPageCount={null}
      className="clients__pagination"
      previousClassName="clients__prev"
      nextClassName="clients__next"
      pageClassName="clients__page"
      activeClassName="clients__active-page"
      disabledClassName="clients__disabled-page"
    />
  );

  return (
    <section className="clients">
      <div className="container">
        <div className="clients__row">
        {isFetching ? "...loading" : clients?.map(el => <ClientsCard key={el._id} {...el} />)}
        </div>
        {pagination}
      </div>
    </section>
  );
};

export default ClientUsersPage;
