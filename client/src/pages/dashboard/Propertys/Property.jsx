// import { CgDollar } from 'react-icons/cg';
import { AiFillCaretRight } from 'react-icons/ai';
// import { Link } from 'react-router-dom';
import property from '../../../assets/wrappers/Property';
import { useDispatch } from 'react-redux';
import { PropertyInfo } from '../../../components';
import moment from 'moment';
// import { deleteTravel, setEditTravel } from '../features/travel/travelSlice';
const Property = ({
  id,
  name,
  total_area,
  cultivated_area,
  city,
  state,
  createdAt,
}) => {
  const dispatch = useDispatch();

  const date = moment(createdAt).format('MMM Do, YYYY');

  return (
    <property>
      <header>
        <div className="info">
          <h5>{name}</h5>
          <p>{city}</p>
          <p>{state}</p>
        </div>
      </header>

      <div className="content"></div>
      <div className="content">
        <PropertyInfo icon={<AiFillCaretRight />} text={total_area} />
      </div>
      <div className="content">
        <PropertyInfo icon={<AiFillCaretRight />} text={cultivated_area} />
      </div>
      {/*
        <footer>
          <div className="actions">
            <Link
              to="/add-travel"
              className="btn edit-btn"
              onClick={() =>
                dispatch(
                  setEditTravel({
                    editTravelId: id,
                    travelName,
                    location,
                    description,
                    characteristics,
                    image,
                    price,
                  }),
                )
              }
            >
              Editar
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteTravel(id))}
            >
              Excluir
            </button>
          </div>
        </footer> */}
      {/* </div> */}
    </property>
  );
};
export default Property;
