import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(NavLink)`
  background-color: transparent;
  display: block;
  border-radius: 15px;
  transition-duration: 500ms;
  color: #667481;
  width: 55px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.active {
    background-color: #8367d6;
    color: #ffffff !important;
  }

  &:hover:not(.active) {
    color: #8367d6;
  }
`;
