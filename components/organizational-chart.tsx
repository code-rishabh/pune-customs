"use client"

import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// Custom node components for different hierarchy levels
const CommissionerNode = ({ children }: { children: React.ReactNode }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="org-node bg-primary text-white px-3 py-2 rounded-lg shadow-lg text-center min-w-[120px] border-2 border-primary cursor-help">
        <div className="font-bold text-sm">Commissioner</div>
        <div className="text-xs opacity-90">Pune Customs</div>
        {children}
      </div>
    </TooltipTrigger>
    <TooltipContent>
      <p className="max-w-xs leading-tight" style={{ fontSize: '12px' }}>
        <strong>Commissioner of Customs</strong><br/>
        Overall administrative and operational head of Pune Customs Office. Responsible for policy implementation, trade facilitation, and enforcement of customs laws.
      </p>
    </TooltipContent>
  </Tooltip>
)

const AdditionalCommissionerNode = ({ children, title, department }: { children: React.ReactNode, title: string, department: string }) => {
  const getTooltipContent = (dept: string) => {
    switch (dept) {
      case 'Administration':
        return 'Manages personnel, finance, legal matters, and overall administrative functions of the customs office.';
      case 'Operations':
        return 'Oversees import/export operations, enforcement activities, and day-to-day customs operations.';
      default:
        return `Additional Commissioner responsible for ${dept} department operations and management.`;
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="org-node bg-accent text-white px-2 py-2 rounded-lg shadow-md text-center min-w-[100px] border-2 border-accent cursor-help">
          <div className="font-semibold text-xs">{title}</div>
          <div className="text-xs opacity-90">{department}</div>
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-xs leading-tight" style={{ fontSize: '12px' }}>
          <strong>{title} - {department}</strong><br/>
          {getTooltipContent(department)}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}

const DeputyCommissionerNode = ({ children, department }: { children: React.ReactNode, department: string }) => {
  const getTooltipContent = (dept: string) => {
    switch (dept) {
      case 'Personnel & Admin':
        return 'Handles human resources, administrative procedures, and office management functions.';
      case 'Finance & Accounts':
        return 'Manages financial operations, accounting, budget planning, and fiscal responsibilities.';
      case 'Legal & Vigilance':
        return 'Oversees legal compliance, vigilance matters, and ensures adherence to customs regulations.';
      case 'Import':
        return 'Manages import clearance procedures, duty assessment, and import-related compliance.';
      case 'Export':
        return 'Handles export documentation, clearance procedures, and export promotion activities.';
      case 'Enforcement':
        return 'Conducts enforcement operations, investigations, and ensures compliance with customs laws.';
      default:
        return `Deputy Commissioner responsible for ${dept} operations and management.`;
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="org-node bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-lg shadow-sm text-center min-w-[90px] border border-slate-300 dark:border-slate-600 cursor-help">
          <div className="font-semibold text-primary text-xs">DC</div>
          <div className="text-xs text-muted-foreground">{department}</div>
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-xs leading-tight" style={{ fontSize: '12px' }}>
          <strong>Deputy Commissioner - {department}</strong><br/>
          {getTooltipContent(department)}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}

const AssistantCommissionerNode = ({ department, colorClass }: { department: string, colorClass: string }) => {
  const getTooltipContent = (dept: string) => {
    if (dept.includes('Import Division')) {
      return 'Handles import clearance, duty assessment, and import-related documentation for specific commodity groups.';
    } else if (dept.includes('Export Division')) {
      return 'Manages export clearance, documentation, and export promotion activities for specific commodity groups.';
    } else if (dept === 'Enforcement') {
      return 'Conducts field enforcement operations, investigations, and compliance checks.';
    } else if (dept === 'Intelligence') {
      return 'Gathers intelligence, analyzes trade patterns, and supports enforcement activities.';
    }
    return `Assistant Commissioner responsible for ${dept} operations.`;
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`org-node px-1 py-1 rounded text-center text-xs min-w-[70px] border ${colorClass} cursor-help`}>
          <div className="font-medium text-xs">AC</div>
          <div className="text-xs opacity-80">{department}</div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-xs leading-tight" style={{ fontSize: '12px' }}>
          <strong>Assistant Commissioner - {department}</strong><br/>
          {getTooltipContent(department)}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}

const SubsidiaryNode = ({ children, title, department }: { children: React.ReactNode, title: string, department: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="org-node bg-muted/50 px-2 py-1 rounded-lg text-center min-w-[90px] border border-muted-foreground/20 cursor-help">
        <div className="font-semibold text-xs">{title}</div>
        <div className="text-xs text-muted-foreground">{department}</div>
        {children}
      </div>
    </TooltipTrigger>
    <TooltipContent>
      <p className="max-w-xs leading-tight" style={{ fontSize: '12px' }}>
        <strong>{title} - {department}</strong><br/>
        Regional offices that provide customs services in their respective districts, extending Pune Customs' reach across Western Maharashtra.
      </p>
    </TooltipContent>
  </Tooltip>
)

const OfficeNode = ({ name, department }: { name: string, department: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="org-node bg-muted/30 px-1 py-1 rounded text-center text-xs min-w-[60px] border border-muted-foreground/30 cursor-help">
        <div className="font-medium text-xs">{name}</div>
        <div className="text-xs opacity-70">{department}</div>
      </div>
    </TooltipTrigger>
    <TooltipContent>
      <p className="max-w-xs leading-tight" style={{ fontSize: '12px' }}>
        <strong>{name} {department}</strong><br/>
        Local customs office providing import/export services, clearance procedures, and trade facilitation in the {name} district.
      </p>
    </TooltipContent>
  </Tooltip>
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
