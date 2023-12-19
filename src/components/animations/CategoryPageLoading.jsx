import React from 'react'
import CategoryLoading from './CategoryLoading';
import PageTitle from '../PageTitle';

const category = new Array(10);
for (let i = 0; i < 10; i++) {
  category[i] = i;
}
function CategoryPageLoading() {
  return (
    <div className="mx-3 h-full mb-20 mt-5">
        <div className="max-w-4xl">
          <PageTitle title={'Browse All'} />
          <div className="flex justify-start items-center mx-3">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-6">
              {category.map((category, index) => {
                return (
                  <CategoryLoading
                    key={index}
                  />
                );
              })}
              
            </div>
          </div>
        </div>
      </div>
  )
}

export default CategoryPageLoading