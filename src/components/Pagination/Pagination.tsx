import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';
import { Button, type ButtonProps, buttonVariants } from '../Button';

import { tv } from 'tailwind-variants';

const paginationStyle = tv({
  base: 'mx-auto flex w-full justify-center',
});

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav role="navigation" aria-label="pagination" className={paginationStyle({ className })} {...props} />
);
Pagination.displayName = 'Pagination';

const paginationContentStyle = tv({ base: 'flex flex-row items-center gap-1' });

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(({ className, ...props }, ref) => (
  <ul ref={ref} className={paginationContentStyle({ className })} {...props} />
));
PaginationContent.displayName = 'PaginationContent';

const paginationItemStyle = tv({
  base: '',
});

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({ className, ...props }, ref) => (
  <li ref={ref} className={paginationItemStyle({ className })} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'button'>;

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => {
  return (
    <Button
      data-active={isActive}
      className={buttonVariants({
        variant: 'pagination',
        size,
        className,
      })}
      {...props}
    />
  );
};

PaginationLink.displayName = 'PaginationLink';

const paginationButtonStyle = tv({ base: 'gap-1 pl-2.5' });

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" size="default" className={paginationButtonStyle({ className })} {...props}>
    <ChevronLeft className="h-4 w-4" />
    <span>Anterior</span>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" size="default" className={paginationButtonStyle({ className })} {...props}>
    <span>Siguiente</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const paginationElipsisStyle = tv({ base: 'flex h-9 w-9 items-center justify-center' });

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span aria-hidden className={paginationElipsisStyle({ className })} {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

type PaginationComponentProps = {
  totalPages: number;
  currentPage: number;
};

const handlePageNavigation = (pageNumber: number) => {
  const url = new URL(window.location.href);
  const page = Number(url.searchParams.get('page')) || 1;
  url.searchParams.set('page', String(pageNumber));
  window.location.href = url.toString();
};

const PaginationComponent = (props: PaginationComponentProps) => {
  const { totalPages, currentPage } = props;
  const generatePaginationItems = () => {
    const pages = [];
    const delta = 2;
    const range = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift('...');
    }
    if (currentPage + delta < totalPages - 1) {
      range.push('...');
    }

    range.unshift(1);
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  const paginationItems = generatePaginationItems();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          onClick={() => {
            handlePageNavigation(currentPage - 1);
          }}
          disabled={currentPage === 1}
        />
        {paginationItems.map((page, index) => {
          const key = `pagination-item-${index}`;
          return (
            <PaginationItem key={key}>
              {typeof page === 'number' ? (
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => {
                    handlePageNavigation(page);
                  }}>
                  {page}
                </PaginationLink>
              ) : (
                <PaginationEllipsis />
              )}
            </PaginationItem>
          );
        })}
        <PaginationNext
          onClick={() => {
            handlePageNavigation(currentPage + 1);
          }}
          disabled={currentPage === totalPages}
        />
      </PaginationContent>
    </Pagination>
  );
};

export {
  Pagination,
  PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
