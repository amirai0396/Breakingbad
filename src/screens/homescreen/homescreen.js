import { useState, useEffect } from 'react';
import { List, Card, AutoComplete, Radio } from 'antd';
import { fetchAllCharaters } from '../../utils/api';

import './homescreen.css';

const Homescreen = ({ history }) => {
  const [allChacraters, setAllCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [category, setCategory] = useState('all');
  const [allCategory, setAllCategory] = useState([]);

  const fillOptions = () => {
    let arr = [];
    let mySet = new Set();
    let arrToLoop = category === 'all' ? allChacraters : filteredCharacters;

    arrToLoop.forEach((item) => {
      if (!mySet.has(item.name)) {
        arr.push({
          value: item.name,
          character: item,
        });
        mySet.add(item.name);
      }
    });
    setOptions(arr);
  };

  const fillCategory = () => {
    let arr = [];

    let mySet = new Set();

    allChacraters.forEach((item) => {
      item.category.split(',').forEach((item) => {
        item = item.trim();
        if (!mySet.has(item)) {
          mySet.add(item);
        } else {
          mySet.add(item);
        }
      });
    });
    arr = [...mySet];
    arr.push('all');
    setAllCategory(arr);
  };

  useEffect(() => {
    (async () => {
      //because the data is small enough
      setAllCharacters(await fetchAllCharaters());
    })();
  }, []);

  useEffect(() => {
    fillOptions();
    // eslint-disable-next-line
  }, [category]);

  useEffect(() => {
    if (allChacraters.length) {
      fillOptions();
      fillCategory();
    }
    // eslint-disable-next-line
  }, [allChacraters]);

  const onChange = (data) => {
    setValue(data);
  };
  function handleRadio(e) {
    let arr = [];
    if (e.target.value === 'all') {
      setFilteredCharacters(arr);
      setCategory(e.target.value);
      return;
    }
    setCategory(e.target.value);
    allChacraters.forEach((item) => {
      if (item.category.includes(e.target.value)) {
        arr.push(item);
      }
    });
    setFilteredCharacters(arr);
  }
  const onSelect = (data, char) => {
    history.push(`/${char.character.char_id}`);
  };
  // const onSearch = (value) => console.log(value);
  return (
    <section className='homescreen'>
      <div className='search'>
        <Radio.Group onChange={handleRadio} defaultValue='all'>
          {allCategory.map((category) => {
            return (
              <Radio.Button key={category} value={category}>
                {category}
              </Radio.Button>
            );
          })}
        </Radio.Group>
        <AutoComplete
          // className='search'
          value={value}
          options={options}
          style={{
            width: 200,
          }}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          onSelect={onSelect}
          // onSearch={onSearch}
          onChange={onChange}
          placeholder='Search by name'
        />
      </div>

      {allChacraters?.length && (
        <List
          className='list'
          size='large'
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
            size: 'small',
            showSizeChanger: false,
          }}
          grid={{
            gutter: 32,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          dataSource={
            filteredCharacters.length ? filteredCharacters : allChacraters
          }
          renderItem={(item) => (
            <List.Item style={{ cursor: 'pointer' }}>
              <Card
                title={item.name}
                onClick={() => history.push(`/${item.char_id}`)}
              >
                <p>
                  {' '}
                  <strong>Occupation: </strong> {item.occupation + ''}
                </p>
                <p>
                  {' '}
                  <strong>Birthday: </strong> {item.birthday}
                </p>

                <p>
                  <strong>Status: </strong>
                  {item.status}
                </p>
              </Card>
            </List.Item>
          )}
        />
      )}
    </section>
  );
};

export default Homescreen;
