import { configureStore } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import authReducer from "../slice/auth";
import skillsReducer from "../slice/skills";
import experinceReducer from "../slice/experinces";
import portfolioQuery from "../query/portfolios";
import educationQuery from "../query/education";
import clientsQuery from "../query/clients";

const rootReducer = {
  auth: authReducer,
  skills: skillsReducer,
  experince: experinceReducer,
  portfolio: portfolioQuery.reducer,
  education: educationQuery.reducer,
  clients: clientsQuery.reducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(portfolioQuery.middleware, educationQuery.middleware, clientsQuery.middleware),
});

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreProvider;
