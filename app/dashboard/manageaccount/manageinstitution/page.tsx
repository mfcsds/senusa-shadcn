import { Suspense } from "react";
import React from "react";
import EditProfileInstitution from "./ManageInstitution-content";

function ManageInstitutionFallback() {
  return <p>Loading...page</p>;
}

const ManageInstitution = () => {
  return (
    <Suspense fallback={<ManageInstitutionFallback />}>
      <EditProfileInstitution></EditProfileInstitution>
    </Suspense>
  );
};

export default ManageInstitution;

// // export default Verification;
// import React, { Suspense } from "react";
// import VerificationContent from "./verification-content";

// // Placeholder fallback component for Suspense
// function VerificationFallback() {
//   return <p>Loading verification page...</p>;
// }

// const VerificationPage = () => {
//   return (
//     <Suspense fallback={<VerificationFallback />}>
//       <VerificationContent />
//     </Suspense>
//   );
// };

// export default VerificationPage;
