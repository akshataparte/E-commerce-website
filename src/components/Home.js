import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LuTarget } from 'react-icons/lu';
import '../styles/Home.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  const limit = 6;
  const [data, setData] = useState([]);
  const [receivedItemsCount, setReceivedItemsCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [filters, setFilters] = useState([
    { filter: 'All', type: true },
    { filter: 'Laptops', type: false },
    { filter: 'Smartphones', type: false },
    { filter: 'Fragrances', type: false },
    { filter: 'Skincare', type: false },
    { filter: 'Groceries', type: false },
    { filter: 'home-decoration', type: false },
    { filter: 'Furniture', type: false },
    { filter: 'womens-dresses', type: false },
    { filter: 'womens-shoes', type: false },
    { filter: 'mens-shirts', type: false },
    { filter: 'mens-shoes', type: false },
    { filter: 'mens-watches', type: false },
    { filter: 'womens-watches', type: false },
    { filter: 'womens-bags', type: false },
    { filter: 'womens-jewellery', type: false },
    { filter: 'Sunglasses', type: false },
    { filter: 'Automotive', type: false },
    { filter: 'Motorcycle', type: false },
    { filter: 'Lighting', type: false },
  ]);

  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async (fresh, filter) => {
    if (fresh) {
      let url;
      let category = filter === 'All' ? '' : `/category/${filter}`;
      url = `https://dummyjson.com/products${category}?limit=${limit}&skip=${0}`;
      let { data: d } = await axios.get(url);
      setTotal(d.total);
      setData(d.products);
      setSkip(6);
      setReceivedItemsCount(receivedItemsCount + d.products.length);
    } else {
      let category =
        selectedFilter.length && selectedFilter != 'All'
          ? `/category/${selectedFilter}`
          : '';
      let url;
      url = `https://dummyjson.com/products${category}?limit=${limit}&skip=${skip}`;
      let { data: d } = await axios.get(url);
      if (total === 0) setTotal(d.total);
      setData([...data, ...d.products]);
      setSkip(skip + 6);
    }
  };

  const handleOnChange = (e, i) => {
    let filter = e.target.value;
    setSelectedFilter(filter);
    setSkip(0);
    setFilters(
      filters.map(({ filter: fil }) => {
        if (filter === fil) {
          return { filter: fil, type: true };
        } else {
          return { filter: fil, type: false };
        }
      })
    );
    setData([]);
    getData(true, filter);
  };

  const handleProductShow = (item) => {
    navigate('/product', { state: { item } });
  };

  function Loader() {
    return (
      <div>
        <h4> Loading ...</h4>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar">
        <h2>
          <LuTarget />
          MINI-MART
        </h2>
      </nav>

      <div className="big-container">
        <div className="filter-container">
          <p> FILTERS:</p>
          {filters &&
            filters.length &&
            filters.map(({ filter, type }, i) => {
              return (
                <div className="filter-comp" key={i}>
                  <p>{filter}</p>{' '}
                  <input
                    name="filters"
                    type="checkbox"
                    value={filter}
                    checked={type}
                    onChange={(e) => handleOnChange(e, i)}
                  />
                </div>
              );
            })}
        </div>

        <div className="container" id="product-con-id">
          <InfiniteScroll
            dataLength={data.length}
            next={getData}
            hasMore={receivedItemsCount >= total ? false : true}
            loader={Loader}
            scrollableTarget="product-con-id"
          >
            {data.length
              ? data.map((item) => {
                  return (
                    <div
                      className="product"
                      key={item.id}
                      onClick={() => handleProductShow(item)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div>
                        <img src={item.images[0]} />
                      </div>
                      <div>
                        <h3>Title : {item.title}</h3>
                        <p>Price : Rs.{item.price}</p>
                        <p>Description : Rs.{item.description}</p>
                      </div>
                    </div>
                  );
                })
              : ''}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default Home;
