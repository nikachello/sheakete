import { getLeads } from "@/actions/admin/leads-actions";
import { LeadsTable } from "@/components/admin/leads/table/Table";
import React from "react";

export const revalidate = 0;

const page = async () => {
  const leads = await getLeads();
  return <LeadsTable leads={leads} />;
};

export default page;
