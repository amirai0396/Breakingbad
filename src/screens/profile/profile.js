import { useState, useEffect } from 'react';
import { Image } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { fetchCharacter, fetchQuoteByAuthor } from '../../utils/api';
import fallbackUrl from './fallbackUrl';

import './profile.css';

function Profile({ history, match }) {
  const [character, setCharacter] = useState([]);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    (async () => {
      setCharacter(await fetchCharacter(match.params.id));
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async () => {
      if (character[0]?.name) {
        setQuotes(await fetchQuoteByAuthor(character[0].name));
      }
    })();
  }, [character]);

  if (typeof character === 'undefined' || !character.length) {
    return <div>loading</div>;
  }

  const {
    name,
    occupation,
    birthday,
    img,
    status,
    nickname,
    portrayed,
    appearance,
  } = character[0];

  return (
    <section className='profile'>
      <div className='back' onClick={() => history.push('/')}>
        <ArrowLeftOutlined />
        Go back
      </div>
      <Image
        width={200}
        src={img}
        placeholder={
          <Image
            preview={true}
            src='error'
            fallback={fallbackUrl}
            width={200}
          />
        }
      />
      <p>
        <strong>Name: </strong>
        {name}
      </p>
      <p>
        <strong>Date of birth: </strong>
        {birthday}
      </p>

      <p>
        <strong>Occupation: </strong>
        {occupation}
      </p>

      <p>
        <strong>Status: </strong>
        {status}
      </p>

      <p>
        <strong>Nickname: </strong>
        {nickname}
      </p>

      <p>
        <strong>Actor: </strong>
        {portrayed}
      </p>

      <p>
        <strong>appearance in season: </strong>
        {appearance?.join(', ')}
      </p>

      <p>
        <strong>Quotes:</strong>
      </p>
      {!quotes?.length && <p>No quotes Found.</p>}
      {quotes?.map((item) => {
        return <p>{item.quote}</p>;
      })}
    </section>
  );
}

export default Profile;
