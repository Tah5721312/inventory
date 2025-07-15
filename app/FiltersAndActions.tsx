// "use client";

// import React, { useEffect } from "react";
// import { CategoryDropDown } from "./AppTable/dropdowns/CategoryDropDown";
// import { StatusDropDown } from "./AppTable/dropdowns/StatusDropDown";
// import { SuppliersDropDown } from "./AppTable/dropdowns/SupplierDropDown";
// import AddCategoryDialog from "./AppTable/ProductDialog/AddCategoryDialog";
// import AddSupplierDialog from "./AppTable/ProductDialog/AddSupplierDialog";
// import AddProductDialog from "./AppTable/ProductDialog/AddProductDialog";
// import { Product } from "@/app/types";
// import { Input } from "@/components/ui/input";
// import PaginationSelection, {
//   PaginationType,
// } from "./Products/PaginationSelection";
// import { ColumnFiltersState } from "@tanstack/react-table";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import { IoClose } from "react-icons/io5";

// type FiltersAndActionsProps = {
//   setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
//   setSearchTerm: (term: string) => void;
//   pagination: PaginationType;
//   setPagination: (
//     updater: PaginationType | ((old: PaginationType) => PaginationType)
//   ) => void;
//   allProducts: Product[];
// };

// export default function FiltersAndActions({
//   setColumnFilters,
//   setSearchTerm,
//   pagination,
//   setPagination,
//   allProducts,
// }: FiltersAndActionsProps) {
//   const [selectedCategory, setSelectedCategory] = React.useState<string[]>([]);
//   const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([]);
//   const [selectedSuppliers, setSelectedSuppliers] = React.useState<string[]>(
//     []
//   );

//   useEffect(() => {
//     const filters: ColumnFiltersState = [
//       {
//         id: "categoryId",
//         value: selectedCategory.length > 0 ? selectedCategory : undefined, // Pass category IDs directly
//       },
//       {
//         id: "status",
//         value: selectedStatuses.length > 0 ? selectedStatuses : undefined, // Pass statuses directly
//       },
//       {
//         id: "supplierId",
//         value: selectedSuppliers.length > 0 ? selectedSuppliers : undefined, // Pass supplier IDs directly
//       },
//     ].filter((filter) => filter.value !== undefined); // Ensure only valid filters are passed

//     console.log("Updated Column Filters:", filters); // Debug log
//     setColumnFilters(filters);
//   }, [selectedCategory, selectedStatuses, selectedSuppliers, setColumnFilters]);

//   return (
//     <div className="flex flex-col gap-4 mb-6">
//       {/* Search Bar */}
//       <div className="flex justify-center">
//         <Input
//           placeholder="Search by name..."
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="max-w-sm h-10"
//         />
//       </div>

//       {/* Filter Area */}
//       <FilterArea
//         selectedStatuses={selectedStatuses}
//         setSelectedStatuses={setSelectedStatuses}
//         selectedCategories={selectedCategory}
//         setSelectedCategories={setSelectedCategory}
//         selectedSuppliers={selectedSuppliers}
//         setSelectedSuppliers={setSelectedSuppliers}
//       />

//       {/* Large Screen Layout */}
//       <div className="hidden lg:flex justify-between items-center gap-4">
//         {/* Add Buttons */}
//         <div className="flex gap-4">
//           <AddProductDialog allProducts={allProducts} />
//           <AddCategoryDialog />
//           <AddSupplierDialog />
//         </div>

//         {/* Pagination Selection */}
//         <div className="flex justify-center">
//           <PaginationSelection
//             pagination={pagination}
//             setPagination={setPagination}
//           />
//         </div>

//         {/* Filter Buttons */}
//         <div className="flex gap-4">
//           <CategoryDropDown
//             selectedCategory={selectedCategory}
//             setSelectedCategory={setSelectedCategory}
//           />
//           <StatusDropDown
//             selectedStatuses={selectedStatuses}
//             setSelectedStatuses={setSelectedStatuses}
//           />
//           <SuppliersDropDown
//             selectedSuppliers={selectedSuppliers}
//             setSelectedSuppliers={setSelectedSuppliers}
//           />
//         </div>
//       </div>

//       {/* Medium and Small Screen Layout */}
//       <div className="flex flex-col lg:hidden gap-4">
//         {/* Add Buttons */}
//         <div className="flex flex-col gap-4">
//           <AddProductDialog allProducts={allProducts} />
//           <AddCategoryDialog />
//           <AddSupplierDialog />
//         </div>

//         {/* Filter Buttons */}
//         <div className="flex flex-col gap-4">
//           <CategoryDropDown
//             selectedCategory={selectedCategory}
//             setSelectedCategory={setSelectedCategory}
//           />
//           <StatusDropDown
//             selectedStatuses={selectedStatuses}
//             setSelectedStatuses={setSelectedStatuses}
//           />
//           <SuppliersDropDown
//             selectedSuppliers={selectedSuppliers}
//             setSelectedSuppliers={setSelectedSuppliers}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

//import React, { useEffect } from "react";
import { CategoryDropDown } from "./AppTable/dropdowns/CategoryDropDown";
import { StatusDropDown } from "./AppTable/dropdowns/StatusDropDown";
import { SuppliersDropDown } from "./AppTable/dropdowns/SupplierDropDown";
import AddCategoryDialog from "./AppTable/ProductDialog/AddCategoryDialog";
import AddSupplierDialog from "./AppTable/ProductDialog/AddSupplierDialog";
import AddProductDialog from "./AppTable/ProductDialog/AddProductDialog";
import { Product } from "@/app/types";
import { Input } from "@/components/ui/input";
import PaginationSelection, {
  PaginationType,
} from "./Products/PaginationSelection";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";

type FiltersAndActionsProps = {
  allProducts: Product[];
  selectedCategory: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
  selectedStatuses: string[];
  setSelectedStatuses: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSuppliers: string[];
  setSelectedSuppliers: React.Dispatch<React.SetStateAction<string[]>>;
  setSearchTerm: (term: string) => void;
  pagination: PaginationType;
  setPagination: (
    updater: PaginationType | ((old: PaginationType) => PaginationType)
  ) => void;
};

export default function FiltersAndActions({
  allProducts,
  selectedCategory,
  setSelectedCategory,
  selectedStatuses,
  setSelectedStatuses,
  selectedSuppliers,
  setSelectedSuppliers,
  setSearchTerm,
  pagination,
  setPagination,
}: FiltersAndActionsProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Search Bar */}
      <div className="flex justify-center">
        <Input
          placeholder="Search by name..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm h-10"
        />
      </div>

      {/* Filter Area */}
      <FilterArea
        selectedStatuses={selectedStatuses}
        setSelectedStatuses={setSelectedStatuses}
        selectedCategories={selectedCategory}
        setSelectedCategories={setSelectedCategory}
        selectedSuppliers={selectedSuppliers}
        setSelectedSuppliers={setSelectedSuppliers}
      />

      {/* Large Screen Layout */}
      <div className="hidden lg:flex justify-between items-center gap-4">
        {/* Add Buttons */}
        <div className="flex gap-4">
          <AddProductDialog allProducts={allProducts} />
          <AddCategoryDialog />
          <AddSupplierDialog />
        </div>

        {/* Pagination Selection */}
        <div className="flex justify-center">
          <PaginationSelection
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4">
          <CategoryDropDown
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <StatusDropDown
            selectedStatuses={selectedStatuses}
            setSelectedStatuses={setSelectedStatuses}
          />
          <SuppliersDropDown
            selectedSuppliers={selectedSuppliers}
            setSelectedSuppliers={setSelectedSuppliers}
          />
        </div>
      </div>

      {/* Medium and Small Screen Layout */}
      <div className="flex flex-col lg:hidden gap-4">
        {/* Add Buttons */}
        <div className="flex flex-col gap-4">
          <AddProductDialog allProducts={allProducts} />
          <AddCategoryDialog />
          <AddSupplierDialog />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-col gap-4">
          <CategoryDropDown
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <StatusDropDown
            selectedStatuses={selectedStatuses}
            setSelectedStatuses={setSelectedStatuses}
          />
          <SuppliersDropDown
            selectedSuppliers={selectedSuppliers}
            setSelectedSuppliers={setSelectedSuppliers}
          />
        </div>
      </div>
    </div>
  );
}

// Add the FilterArea component here
function FilterArea({
  selectedStatuses,
  setSelectedStatuses,
  selectedCategories,
  setSelectedCategories,
  selectedSuppliers,
  setSelectedSuppliers,
}: {
  selectedStatuses: string[];
  setSelectedStatuses: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSuppliers: string[];
  setSelectedSuppliers: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 poppins">
      {/* Status Filter */}
      {selectedStatuses.length > 0 && (
        <div className="border-dashed border rounded-sm p-1 flex gap-2 items-center px-2 text-sm">
          <span className="text-gray-600">Status</span>
          <Separator orientation="vertical" />
          <div className="flex gap-2 items-center">
            {selectedStatuses.length < 3 ? (
              selectedStatuses.map((status, index) => (
                <Badge key={index} variant={"secondary"}>
                  {status}
                </Badge>
              ))
            ) : (
              <Badge variant={"secondary"}>3 Selected</Badge>
            )}
          </div>
        </div>
      )}

      {/* Category Filter */}
      {selectedCategories.length > 0 && (
        <div className="border-dashed border rounded-sm p-1 flex gap-2 items-center px-2 text-sm">
          <span className="text-gray-600">Category</span>
          <Separator orientation="vertical" />
          <div className="flex gap-2 items-center">
            {selectedCategories.length < 3 ? (
              selectedCategories.map((category, index) => (
                <Badge key={index} variant={"secondary"}>
                  {category}
                </Badge>
              ))
            ) : (
              <Badge variant={"secondary"}>3 Selected</Badge>
            )}
          </div>
        </div>
      )}

      {/* Supplier Filter */}
      {selectedSuppliers.length > 0 && (
        <div className="border-dashed border rounded-sm p-1 flex gap-2 items-center px-2 text-sm">
          <span className="text-gray-600">Supplier</span>
          <Separator orientation="vertical" />
          <div className="flex gap-2 items-center">
            {selectedSuppliers.length < 3 ? (
              selectedSuppliers.map((supplier, index) => (
                <Badge key={index} variant={"secondary"}>
                  {supplier}
                </Badge>
              ))
            ) : (
              <Badge variant={"secondary"}>3 Selected</Badge>
            )}
          </div>
        </div>
      )}

      {/* Reset Filters Button */}
      {(selectedStatuses.length > 0 ||
        selectedCategories.length > 0 ||
        selectedSuppliers.length > 0) && (
        <Button
          onClick={() => {
            setSelectedStatuses([]);
            setSelectedCategories([]);
            setSelectedSuppliers([]);
          }}
          variant={"ghost"}
          className="p-1 px-2"
        >
          <span>Reset</span>
          <IoClose />
        </Button>
      )}
    </div>
  );
}
