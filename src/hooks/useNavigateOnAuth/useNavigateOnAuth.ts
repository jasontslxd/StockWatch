import { useNavigate } from "react-router";
import { useAuth } from "hooks";
import { Page } from "common";
import { useEffect } from "react";

export const useNavigateOnAuth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(Page.Dashboard);
    }
  }, [user, navigate]);
};