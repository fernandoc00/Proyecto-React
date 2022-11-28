import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './WishItem.css';

function WishItem({ wish, onChangeWish }) {
  return (
    <li className="wishItem">
      <input
        type="checkbox"
        defaultChecked={wish.done}
        id={wish.text}
        onChange={(event) => {
          onChangeWish({
            id: wish.id,
            text: wish.text,
            done: event.target.checked,
          });
        }}
      />
      <label className={classNames({ 'text-decoration-line-through': wish.done, 'wish-item-done': wish.done })} htmlFor={wish.id}>{wish.text}</label>
    </li>
  );
}

WishItem.propTypes = {
  wish: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }),
  onChangeWish: PropTypes.func,
};

WishItem.defaultProps = {
  wish: {
    id: '0',
    text: '',
    done: false,
  },
  onChangeWish: () => {},
};

export default WishItem;
