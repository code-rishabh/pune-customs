"use client"

import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'

// Custom node components for different hierarchy levels
const CommissionerNode = ({ children }: { children: React.ReactNode }) => (
  <div className="org-node bg-primary text-white px-3 py-2 rounded-lg shadow-lg text-center min-w-[120px] border-2 border-primary">
    <div className="font-bold text-sm">Commissioner</div>
    <div className="text-xs opacity-90">Pune Customs</div>
    {children}
  </div>
)

const AdditionalCommissionerNode = ({ children, title, department }: { children: React.ReactNode, title: string, department: string }) => (
  <div className="org-node bg-accent text-white px-2 py-2 rounded-lg shadow-md text-center min-w-[100px] border-2 border-accent">
    <div className="font-semibold text-xs">{title}</div>
    <div className="text-xs opacity-90">{department}</div>
    {children}
  </div>
)

const DeputyCommissionerNode = ({ children, department }: { children: React.ReactNode, department: string }) => (
  <div className="org-node bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-lg shadow-sm text-center min-w-[90px] border border-slate-300 dark:border-slate-600">
    <div className="font-semibold text-primary text-xs">DC</div>
    <div className="text-xs text-muted-foreground">{department}</div>
    {children}
  </div>
)

const AssistantCommissionerNode = ({ department, colorClass }: { department: string, colorClass: string }) => (
  <div className={`org-node px-1 py-1 rounded text-center text-xs min-w-[70px] border ${colorClass}`}>
    <div className="font-medium text-xs">AC</div>
    <div className="text-xs opacity-80">{department}</div>
  </div>
)

const SubsidiaryNode = ({ children, title, department }: { children: React.ReactNode, title: string, department: string }) => (
  <div className="org-node bg-muted/50 px-2 py-1 rounded-lg text-center min-w-[90px] border border-muted-foreground/20">
    <div className="font-semibold text-xs">{title}</div>
    <div className="text-xs text-muted-foreground">{department}</div>
    {children}
  </div>
)

const OfficeNode = ({ name, department }: { name: string, department: string }) => (
  <div className="org-node bg-muted/30 px-1 py-1 rounded text-center text-xs min-w-[60px] border border-muted-foreground/30">
    <div className="font-medium text-xs">{name}</div>
    <div className="text-xs opacity-70">{department}</div>
  </div>
)

export function OrganizationalChart() {
  return (
    <div className="w-full">
      <div className="p-2">
        <Tree
          lineWidth="1px"
          lineColor="#6B7280"
          lineBorderRadius="6px"
          nodePadding="4px"
        >
          <TreeNode label={<CommissionerNode />}>
            <TreeNode label={<AdditionalCommissionerNode title="Additional Commissioner" department="Administration" />}>
              <TreeNode label={<DeputyCommissionerNode department="Personnel & Admin" />} />
              <TreeNode label={<DeputyCommissionerNode department="Finance & Accounts" />} />
              <TreeNode label={<DeputyCommissionerNode department="Legal & Vigilance" />} />
            </TreeNode>
            
            <TreeNode label={<AdditionalCommissionerNode title="Additional Commissioner" department="Operations" />}>
              <TreeNode label={<DeputyCommissionerNode department="Import" />}>
                <TreeNode label={<AssistantCommissionerNode department="Import Division I" colorClass="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" />} />
                <TreeNode label={<AssistantCommissionerNode department="Import Division II" colorClass="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" />} />
              </TreeNode>
              
              <TreeNode label={<DeputyCommissionerNode department="Export" />}>
                <TreeNode label={<AssistantCommissionerNode department="Export Division I" colorClass="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" />} />
                <TreeNode label={<AssistantCommissionerNode department="Export Division II" colorClass="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" />} />
              </TreeNode>
              
              <TreeNode label={<DeputyCommissionerNode department="Enforcement" />}>
                <TreeNode label={<AssistantCommissionerNode department="Enforcement" colorClass="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800" />} />
                <TreeNode label={<AssistantCommissionerNode department="Intelligence" colorClass="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800" />} />
              </TreeNode>
            </TreeNode>
            
            <TreeNode label={<SubsidiaryNode title="Subsidiary Offices" department="Regional Offices" />}>
              <TreeNode label={<OfficeNode name="Ahmednagar" department="Customs Office" />} />
              <TreeNode label={<OfficeNode name="Solapur" department="Customs Office" />} />
              <TreeNode label={<OfficeNode name="Satara" department="Customs Office" />} />
              <TreeNode label={<OfficeNode name="Kolhapur" department="Customs Office" />} />
            </TreeNode>
          </TreeNode>
        </Tree>
      </div>
    </div>
  )
}
