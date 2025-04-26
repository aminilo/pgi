declare module 'inquirer-search-checkbox' {
  import { Question } from 'inquirer';

  const searchCheckbox: (inquirer: any) => void;
  export default searchCheckbox;
}

declare module 'inquirer' {
  interface QuestionMap {
    'search-checkbox': Question<'search-checkbox'>;
  }
}
