import dbConnect from './mongodb';
import AuditLog from '@/models/AuditLog';

export async function logAudit({
  adminEmail,
  adminName,
  action,
  module,
  recordId,
  recordLabel,
  fieldChanged,
  previousValue,
  newValue,
  ipAddress
}: {
  adminEmail: string;
  adminName: string;
  action: 'create' | 'update' | 'delete' | 'publish' | 'unpublish' | 'login' | 'logout';
  module: string;
  recordId?: string;
  recordLabel?: string;
  fieldChanged?: string;
  previousValue?: string;
  newValue?: string;
  ipAddress?: string;
}) {
  await dbConnect();
  
  await AuditLog.create({
    timestamp: new Date(),
    adminEmail,
    adminName,
    action,
    module,
    recordId,
    recordLabel,
    fieldChanged,
    previousValue: previousValue?.substring(0, 500),
    newValue: newValue?.substring(0, 500),
    ipAddress
  });
}
