import React from "react";
import Catagory from "../components/Catagory";
import { useFetchData } from "../hooks/useFetchData";
import PageTitle from "../components/PageTitle";
import CategoryPageLoading from "../components/animations/CategoryPageLoading";
import { useQueryClient } from "@tanstack/react-query";

// const queryClient = useQueryClient()

function Searchpage() {
  

  // const invalidateQuery = () => {
  //   console.log('inv')
  //   queryClient.invalidateQueries(['data', '/categories'])
  // }

  // invalidateQuery()

  const {data, isLoading} = useFetchData('/categories')
 
  if(isLoading) {
    return (<CategoryPageLoading />)
  }
  
  return (
    <>
      <div className="mx-3 h-full mb-20 mt-5">
        <div className="max-w-3xl">
          <PageTitle title={'Browse All'}/>
          <div className="flex justify-start items-center mx-3">
          
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 ">
              {data.data.map((category, index) => {
                return (
                  <Catagory
                    key={index}
                    name={category.name}
                    imgurl={category.url}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Searchpage;
