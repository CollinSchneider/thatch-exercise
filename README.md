This is a [Next.js](https://nextjs.org/) project for the Thatch(https://thatch.ai) growth engineering coding exercise.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the employees table. You can sort the table by clicking on each table header. Each row is clickable so that you can view the employee details in the slideout drawer.

Run `npm run test` in order to run the provided tests, which currently validates the `Employee` model and the `EmployeeTable` Component satisfy the requirements.

## If I were to extend this app...

1. Right now the HDGHP minimum deductible amount and HSA contribution limit are hardcoded. Ideally this would be pulled in dynamically either via an API or by storing it in our backend.
2. We currently assume the number of employees in the Airtable DB is within reason (currently it's returning 30 records). If this were to expand to 100s or 1000s of records, we would probably want to paginate the results. This would provide for a better user experience. If we wanted to continue to support the sorting logic we would also have to likely rethink things because we are currently computing the order of the employees on the client upon each header click. Ideally the sorting logic would be computed on the backend via the Airtable API, which looks to support a [sort query parameter](https://airtable.com/developers/web/api/list-records#query-sort).