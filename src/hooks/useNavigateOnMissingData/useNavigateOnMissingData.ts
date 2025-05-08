import { Page } from 'common';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

interface IUseNavigateOnMissingDataProps {
  shouldNavigate?: boolean;
  pageToNavigate: Page;
}

export const useNavigateOnMissingData = ({
  shouldNavigate,
  pageToNavigate,
}: IUseNavigateOnMissingDataProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldNavigate) {
      navigate(pageToNavigate);
    }
  }, [shouldNavigate, pageToNavigate, navigate]);
};
