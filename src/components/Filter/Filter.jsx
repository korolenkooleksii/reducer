import { Wrapper, LabelForm, InputForm } from './Filter.styled';
import PropTypes from 'prop-types';

const Filter = ({ filter = '', updateFilter }) => {

  return (
    <Wrapper>
      <LabelForm>
        Find contact by name
        <InputForm
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={e => {
            updateFilter(e.currentTarget.value.toLowerCase());
          }}
          value={filter}
        />
      </LabelForm>
    </Wrapper>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  updateFilter: PropTypes.func,
};

export default Filter;
