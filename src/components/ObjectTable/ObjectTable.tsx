import { useState, useMemo } from 'react';
import './ObjectTable.css';

interface AttackData {
  id: string;
  name: string;
  categories: string[];
  sources: number;
  securityInfo: { label: string; variant: 'blue' | 'green' }[];
  method: string;
  endpoint: string;
  firstDetected: string;
  parameter: string;
  country: { code: string; name: string };
}

const mockData: AttackData[] = [
  {
    id: '1',
    name: 'account-takeover in body.password',
    categories: ['api-abuse', 'account-takeover'],
    sources: 23,
    securityInfo: [
      { label: 'CWE-495', variant: 'blue' },
      { label: 'CWE-12', variant: 'green' },
      { label: 'CWE-4', variant: 'blue' },
      { label: '+5', variant: 'green' },
    ],
    method: 'GET',
    endpoint: '/api/v2/users/profile',
    firstDetected: '22 Dec, 2025 5:22:53 AM',
    parameter: 'query.user_id',
    country: { code: 'BE', name: 'Belgium' },
  },
  {
    id: '2',
    name: 'account-takeover in body.password',
    categories: ['api-abuse', 'account-takeover'],
    sources: 23,
    securityInfo: [{ label: 'CWE-12', variant: 'green' }],
    method: 'GET',
    endpoint: '/api/v2/users/profile',
    firstDetected: '22 Dec, 5:22:53 AM',
    parameter: 'query.user_id',
    country: { code: 'BE', name: 'Belgium' },
  },
  {
    id: '3',
    name: 'account-takeover in body.password',
    categories: ['api-abuse', 'account-takeover'],
    sources: 23,
    securityInfo: [
      { label: 'CWE-495', variant: 'blue' },
      { label: 'CWE-4', variant: 'green' },
    ],
    method: 'GET',
    endpoint: '/api/v2/users/profile',
    firstDetected: '22 Dec, 5:22:53 AM',
    parameter: 'query.user_id',
    country: { code: 'BE', name: 'Belgium' },
  },
  {
    id: '4',
    name: 'account-takeover in body.password',
    categories: ['api-abuse', 'account-takeover'],
    sources: 23,
    securityInfo: [
      { label: 'CWE-495', variant: 'blue' },
      { label: 'CWE-12', variant: 'green' },
      { label: 'CWE-4', variant: 'blue' },
      { label: '+5', variant: 'green' },
    ],
    method: 'GET',
    endpoint: '/api/v2/users/profile',
    firstDetected: '22 Dec, 5:22:53 AM',
    parameter: 'query.user_id',
    country: { code: 'BE', name: 'Belgium' },
  },
  {
    id: '5',
    name: 'account-takeover in body.password',
    categories: ['api-abuse', 'account-takeover'],
    sources: 23,
    securityInfo: [{ label: 'CWE-12', variant: 'green' }],
    method: 'GET',
    endpoint: '/api/v2/users/profile',
    firstDetected: '22 Dec, 5:22:53 AM',
    parameter: 'query.user_id',
    country: { code: 'BE', name: 'Belgium' },
  },
  {
    id: '6',
    name: 'account-takeover in body.password',
    categories: ['api-abuse', 'account-takeover'],
    sources: 23,
    securityInfo: [
      { label: 'CWE-495', variant: 'blue' },
      { label: 'CWE-4', variant: 'green' },
    ],
    method: 'GET',
    endpoint: '/api/v2/users/profile',
    firstDetected: '22 Dec, 5:22:53 AM',
    parameter: 'query.user_id',
    country: { code: 'BE', name: 'Belgium' },
  },
  {
    id: '7',
    name: 'account-takeover in body.password',
    categories: ['api-abuse', 'account-takeover'],
    sources: 23,
    securityInfo: [{ label: 'CWE-12', variant: 'green' }],
    method: 'GET',
    endpoint: '/api/v2/users/profile',
    firstDetected: '22 Dec, 5:22:53 AM',
    parameter: 'query.user_id',
    country: { code: 'BE', name: 'Belgium' },
  },
  {
    id: '8',
    name: 'account-takeover in body.password',
    categories: ['api-abuse', 'account-takeover'],
    sources: 23,
    securityInfo: [
      { label: 'CWE-495', variant: 'blue' },
      { label: 'CWE-4', variant: 'green' },
    ],
    method: 'GET',
    endpoint: '/api/v2/users/profile',
    firstDetected: '22 Dec, 5:22:53 AM',
    parameter: 'query.user_id',
    country: { code: 'BE', name: 'Belgium' },
  },
];

const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default function ObjectTable() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const allSelected = selectedIds.size === mockData.length && mockData.length > 0;
  const someSelected = selectedIds.size > 0 && selectedIds.size < mockData.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(mockData.map((item) => item.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleBulkAction = (action: string) => {
    alert(`${action} action triggered for ${selectedIds.size} item(s): ${Array.from(selectedIds).join(', ')}`);
  };

  const columns = useMemo(
    () => [
      { key: 'checkbox', label: '', width: 32 },
      { key: 'name', label: 'Attack name', width: 300 },
      { key: 'sources', label: 'Sources', width: 92 },
      { key: 'securityInfo', label: 'Security info', width: 200 },
      { key: 'endpoint', label: 'Endpoints', width: 220 },
      { key: 'firstDetected', label: 'First detected', width: 160 },
      { key: 'parameter', label: 'Parameters', width: 140 },
      { key: 'country', label: '', width: 120 },
    ],
    []
  );

  return (
    <div className="object-table-container">
      <aside className="sidebar" />

      <main className="main-content">
        <header className="table-header">
          <h1 className="table-title">Object table</h1>
          <button className="settings-btn" aria-label="Settings">
            <SettingsIcon />
          </button>
        </header>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key} style={{ width: col.width }}>
                    {col.key === 'checkbox' ? (
                      <label className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          checked={allSelected}
                          ref={(el) => {
                            if (el) el.indeterminate = someSelected;
                          }}
                          onChange={toggleSelectAll}
                        />
                        <span className="checkbox-custom" />
                      </label>
                    ) : col.label ? (
                      <div className="header-cell">
                        <SortIcon />
                        <span>{col.label}</span>
                      </div>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockData.map((row) => (
                <tr
                  key={row.id}
                  className={`${selectedIds.has(row.id) ? 'selected' : ''} ${hoveredRowId === row.id ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredRowId(row.id)}
                  onMouseLeave={() => setHoveredRowId(null)}
                >
                  <td>
                    <label className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(row.id)}
                        onChange={() => toggleSelect(row.id)}
                      />
                      <span className="checkbox-custom" />
                    </label>
                  </td>
                  <td>
                    <div className="name-cell">
                      <a href="#" className="attack-link">
                        {row.name}
                      </a>
                      <div className="categories">
                        {row.categories.map((cat, i) => (
                          <span key={cat}>
                            {i > 0 && <span className="dot">•</span>}
                            <span className="category">{cat}</span>
                          </span>
                        ))}
                      </div>
                      {hoveredRowId === row.id && (
                        <div className="row-actions">
                          <button className="action-btn" title="Toggle">
                            <ToggleIcon />
                          </button>
                          <button className="action-btn" title="More">
                            <MoreIcon />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="sources-cell">{row.sources}</td>
                  <td>
                    <div className="tags-cell">
                      {row.securityInfo.map((tag, i) => (
                        <span key={i} className={`tag tag-${tag.variant}`}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="endpoint-cell">
                      <span className="method-badge">{row.method}</span>
                      <span className="endpoint-path">{row.endpoint}</span>
                    </div>
                  </td>
                  <td className="date-cell">{row.firstDetected}</td>
                  <td className="param-cell">{row.parameter}</td>
                  <td>
                    <div className="country-cell">
                      <span className="flag">{getFlagEmoji(row.country.code)}</span>
                      <span>{row.country.name}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedIds.size > 0 && (
          <div className="bulk-actions-bar">
            <div className="bulk-info">
              <span className="selected-count">{selectedIds.size} selected</span>
              <span className="dot">•</span>
              <button className="link-btn" onClick={toggleSelectAll}>
                Select all
              </button>
              <span className="dot">•</span>
              <button className="link-btn" onClick={clearSelection}>
                Clear
              </button>
            </div>
            <div className="bulk-buttons">
              <button className="bulk-btn secondary" onClick={() => handleBulkAction('Export')}>
                <ChevronDownIcon />
                Export
              </button>
              <button className="bulk-btn secondary" onClick={() => handleBulkAction('Assign')}>
                <ChevronDownIcon />
                Assign
              </button>
              <button className="bulk-btn primary" onClick={() => handleBulkAction('Resolve')}>
                <RefreshIcon />
                Resolve
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Icons
const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.1667 12.5C16.0557 12.7513 16.0226 13.0302 16.0716 13.3005C16.1206 13.5708 16.2495 13.8203 16.4417 14.0167L16.4917 14.0667C16.6466 14.2215 16.7695 14.4053 16.8534 14.6076C16.9373 14.8099 16.9805 15.0268 16.9805 15.2458C16.9805 15.4649 16.9373 15.6817 16.8534 15.8841C16.7695 16.0864 16.6466 16.2702 16.4917 16.425C16.3369 16.5799 16.1531 16.7028 15.9507 16.7867C15.7484 16.8706 15.5316 16.9138 15.3125 16.9138C15.0934 16.9138 14.8766 16.8706 14.6743 16.7867C14.4719 16.7028 14.2881 16.5799 14.1333 16.425L14.0833 16.375C13.887 16.1828 13.6375 16.0539 13.3672 16.0049C13.0969 15.9559 12.818 15.989 12.5667 16.1C12.3203 16.2056 12.111 16.3832 11.9665 16.6097C11.822 16.8362 11.7489 17.1015 11.7567 17.3708V17.5C11.7567 17.942 11.5811 18.366 11.2685 18.6785C10.9559 18.9911 10.532 19.1667 10.09 19.1667C9.64797 19.1667 9.22405 18.9911 8.91149 18.6785C8.59893 18.366 8.42334 17.942 8.42334 17.5V17.425C8.42556 17.1482 8.3431 16.8771 8.18691 16.6493C8.03073 16.4215 7.80803 16.2479 7.55001 16.1533C7.29873 16.0423 7.01987 16.0092 6.74953 16.0582C6.47919 16.1073 6.22968 16.2362 6.03334 16.4283L5.98334 16.4783C5.82855 16.6332 5.64478 16.7562 5.44241 16.8401C5.24004 16.924 5.02321 16.9672 4.80417 16.9672C4.58514 16.9672 4.36831 16.924 4.16594 16.8401C3.96357 16.7562 3.7798 16.6332 3.62501 16.4783C3.47013 16.3235 3.34721 16.1398 3.26332 15.9374C3.17943 15.7351 3.13623 15.5182 3.13623 15.2992C3.13623 15.0802 3.17943 14.8633 3.26332 14.661C3.34721 14.4586 3.47013 14.2748 3.62501 14.12L3.67501 14.07C3.86719 13.8737 3.99608 13.6242 4.04511 13.3538C4.09413 13.0835 4.06098 12.8046 3.95001 12.5533C3.84451 12.3069 3.66685 12.0976 3.44034 11.9531C3.21383 11.8086 2.94858 11.7355 2.67917 11.7433H2.55001C2.10798 11.7433 1.68406 11.5677 1.3715 11.2552C1.05894 10.9426 0.883346 10.5187 0.883346 10.0767C0.883346 9.63464 1.05894 9.21072 1.3715 8.89816C1.68406 8.5856 2.10798 8.41001 2.55001 8.41001H2.62501C2.90181 8.41222 3.17296 8.32977 3.40075 8.17358C3.62854 8.0174 3.80217 7.7947 3.89667 7.53668C4.00765 7.2854 4.04079 7.00654 3.99177 6.7362C3.94275 6.46586 3.81386 6.21635 3.62168 6.02001L3.57168 5.97001C3.4168 5.81522 3.29388 5.63145 3.20999 5.42908C3.1261 5.22671 3.0829 5.00988 3.0829 4.79085C3.0829 4.57181 3.1261 4.35498 3.20999 4.15261C3.29388 3.95024 3.4168 3.76647 3.57168 3.61168C3.72647 3.4568 3.91024 3.33388 4.11261 3.24999C4.31498 3.1661 4.53181 3.1229 4.75085 3.1229C4.96988 3.1229 5.18671 3.1661 5.38908 3.24999C5.59145 3.33388 5.77522 3.4568 5.93001 3.61168L5.98001 3.66168C6.17635 3.85386 6.42586 3.98275 6.6962 4.03177C6.96654 4.08079 7.2454 4.04765 7.49667 3.93668H7.55001C7.79643 3.83117 8.00573 3.65351 8.15023 3.427C8.29473 3.20049 8.36785 2.93525 8.36001 2.66584V2.50001C8.36001 2.05798 8.5356 1.63406 8.84816 1.3215C9.16072 1.00894 9.58464 0.833344 10.0267 0.833344C10.4687 0.833344 10.8926 1.00894 11.2052 1.3215C11.5177 1.63406 11.6933 2.05798 11.6933 2.50001V2.57501C11.6855 2.84442 11.7586 3.10966 11.9031 3.33617C12.0476 3.56268 12.2569 3.74034 12.5033 3.84584C12.7546 3.95682 13.0335 3.98996 13.3038 3.94094C13.5742 3.89192 13.8237 3.76303 14.02 3.57085L14.07 3.52085C14.2248 3.36597 14.4086 3.24305 14.6109 3.15916C14.8133 3.07527 15.0301 3.03207 15.2492 3.03207C15.4682 3.03207 15.685 3.07527 15.8874 3.15916C16.0898 3.24305 16.2735 3.36597 16.4283 3.52085C16.5832 3.67564 16.7061 3.85941 16.79 4.06178C16.8739 4.26415 16.9171 4.48098 16.9171 4.70001C16.9171 4.91905 16.8739 5.13588 16.79 5.33825C16.7061 5.54062 16.5832 5.72439 16.4283 5.87918L16.3783 5.92918C16.1862 6.12552 16.0573 6.37503 16.0082 6.64537C15.9592 6.91571 15.9924 7.19457 16.1033 7.44584V7.50001C16.2088 7.74643 16.3865 7.95573 16.613 8.10023C16.8395 8.24473 17.1048 8.31785 17.3742 8.31001H17.5C17.942 8.31001 18.366 8.4856 18.6785 8.79816C18.9911 9.11072 19.1667 9.53464 19.1667 9.97668C19.1667 10.4187 18.9911 10.8426 18.6785 11.1552C18.366 11.4677 17.942 11.6433 17.5 11.6433H17.425C17.1556 11.6512 16.8903 11.7243 16.6638 11.8688C16.4373 12.0133 16.2596 12.2226 16.1542 12.4692"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SortIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2.5V9.5M6 2.5L3.5 5M6 2.5L8.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ToggleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="12" height="8" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="5" cy="8" r="2" fill="currentColor" />
  </svg>
);

const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="4" r="1" fill="currentColor" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
    <circle cx="8" cy="12" r="1" fill="currentColor" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C10.2091 2 12.1359 3.19968 13.2 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M10 5H13.5V1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
