// import { render, screen } from "@testing-library/react";
// import { MemoryRouter, Route, Routes } from "react-router-dom";
// import Navbar from "../components/Navbar"; // Juster importbanen etter din prosjektstruktur
// import { describe, expect, it, vi } from "vitest";

// describe("Navbar Component", () => {
//   it("renders Navbar with correct links and SearchBar", () => {
//     render(
//       <MemoryRouter initialEntries={["/"]}>
//         <Navbar />
//       </MemoryRouter>
//     );

//     // Check if Navbar title is rendered
//     expect(screen.getByText("Readable")).toBeInTheDocument();

//     // Check if HOME and LIBRARY links are present
//     expect(screen.getByText("HOME")).toBeInTheDocument();
//     expect(screen.getByText("LIBRARY")).toBeInTheDocument();

//     // Check if SearchBar is rendered
//     /* expect(screen.getByRole("search")).toBeInTheDocument(); */
//   });

//   it("applies the active class to the correct link when navigating", () => {
//     render(
//       <MemoryRouter initialEntries={["/library"]}>
//         <Navbar />
//       </MemoryRouter>
//     );

//   // Check if the LIBRARY link is active
//   const libraryLink = screen.getByText("LIBRARY");
//   // Assert that it has a class that starts with 'active' or similar
//   expect(libraryLink.className).toMatch(/^.*active.*$/);

//   // Check if the HOME link is not active
//   const homeLink = screen.getByText("HOME");
//   expect(homeLink.className).not.toMatch(/^.*active.*$/);
//   });

//   it("applies transparent class to navbar on the home page", () => {
//     render(
//       <MemoryRouter initialEntries={["/"]}>
//         <Navbar />
//       </MemoryRouter>
//     );

//     // Check if navbar has the transparentNavbar class when on the home page
//     const navbar = screen.getByRole("banner");
//     expect(navbar.className).toMatch(/transparentNavbar/); 
//   });

//   it("does not apply transparent class on other pages", () => {
//     render(
//       <MemoryRouter initialEntries={["/library"]}>
//         <Navbar />
//       </MemoryRouter>
//     );

//     // Check if navbar does not have transparent class when not on the home page
//     const navbar = screen.getByRole("banner");
//     expect(navbar.className).not.toMatch(/transparentNavbar/); 
//   });
// });
