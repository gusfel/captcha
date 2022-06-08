/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';

const numbers = {
  1: 'ONE',
  2: 'TWO',
  3: 'THREE',
  4: 'FOUR',
  5: 'FIVE',
  6: 'SIX',
};
const photos = {
  ONE:
  'https://images.pexels.com/photos/2249528/pexels-photo-2249528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  TWO:
  'https://images.pexels.com/photos/1061141/pexels-photo-1061141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  THREE:
  'https://images.pexels.com/photos/2249530/pexels-photo-2249530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  FOUR:
  'https://images.pexels.com/photos/1061139/pexels-photo-1061139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  FIVE:
  'https://images.pexels.com/photos/1010973/pexels-photo-1010973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  SIX:
  'https://images.pexels.com/photos/4772874/pexels-photo-4772874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
};

function App() {
  return <Captcha />;
}
function Block({ number, success }) {
  const [topRow, setTopRow] = useState([]);
  const [bottomRow, setBottomRow] = useState([]);

  const updateRows = () => {
    const nums = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX'];
    const tempTop = [];
    const tempBot = [];
    while (nums.length > 3) {
      const index = Math.floor(Math.random() * nums.length);
      const val = nums[index];
      nums.splice(index, 1);
      tempTop.push(val);
    }
    while (nums.length) {
      const index = Math.floor(Math.random() * nums.length);
      const val = nums[index];
      nums.splice(index, 1);
      tempBot.push(val);
    }
    setTopRow(tempTop);
    setBottomRow(tempBot);
  };

  useEffect(() => {
    updateRows();
  }, []);

  const handleClick = (e) => {
    const { name } = e.target;
    if (name === number) {
      success();
    } else {
      alert('wrong one!');
    }
  };

  const makeRow = (arr) => arr.map((val) => (
    <input
      type="image"
      alt=""
      key={val}
      name={val}
      src={photos[val]}
      width="100"
      height="100"
      onClick={(e) => handleClick(e)}
    />
  ));

  return (
    <div>
      <div>
        {makeRow(topRow)}
      </div>
      <div>
        {makeRow(bottomRow)}
      </div>
    </div>
  );
}

function Captcha() {
  const [correct, setCorrect] = useState(true);
  const [number, setNumber] = useState(0);

  const getNumber = () => {
    setNumber(numbers[Math.floor(Math.random() * 6) + 1]);
  };

  const handleClick = () => {
    getNumber();
    setCorrect(false);
  };

  const success = () => {
    setCorrect(true);
  };

  return (
    <div>
      {correct
        ? <button onClick={handleClick} type="button">show captcha</button>
        : (
          <div>
            click
            {' '}
            {number}
            <Block number={number} success={success} />
          </div>
        )}
    </div>
  );
}

export default App;
