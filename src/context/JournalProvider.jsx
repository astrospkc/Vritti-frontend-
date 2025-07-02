import { useEffect, useState } from "react";
import { journalContext } from "./JournalContext";
import PropTypes from "prop-types";
import axios from "axios";
import { groupJournalsByMonthAndWeek } from "../components/miscellaneous/GetJournalsMonthWeek";

export const JournalProvider = ({ children }) => {
  // all the journals of the user
  const [journals, setJournals] = useState([]);

  const [clickedJournal, setClickedJournal] = useState();
  const [journalLoading, setJournalLoading] = useState(false);

  // const [ai_summary, setAi_Summary] = useState();
  // getting all the journals associated with the user
  const fetchJournals = async () => {
    setJournalLoading(true);
    // setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const res = await axios.get(
        `${import.meta.env.VITE_URL}/weekJournals/fetchAlljournals`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure token is provided correctly
          },
        }
      );

      const data = res.data;
      console.log("data obtained in journals: ", data);
      setJournals(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching journals:", error);
      // setError(error.message);
    } finally {
      setJournalLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const journalObject = groupJournalsByMonthAndWeek(journals);
  console.log("journal Object: ", journalObject);
  let monthYear;
  if (journalObject != null) {
    monthYear = Object.keys(journalObject);
  }

  return (
    <>
      <journalContext.Provider
        value={{
          journals,
          setJournals,
          clickedJournal,
          setClickedJournal,
          journalLoading,
          setJournalLoading,
          fetchJournals,
          monthYear,

          journalObject,
        }}
      >
        {children}
      </journalContext.Provider>
    </>
  );
};
JournalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
