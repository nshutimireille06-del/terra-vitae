import { useState } from 'react'
import useGameStore from '../../store/gameStore'

const INITIAL_BOOKS = [
  // Finished — from your 2024 reading wrapped
  { id: 1,  title: 'Do You Remember?',          author: 'Freida McFadden',       status: 'finished',   cover: 'https://covers.openlibrary.org/b/isbn/9781464220785-L.jpg' },
  { id: 2,  title: "Gwendy's Button Box",        author: 'Stephen King',          status: 'finished',   cover: 'https://covers.openlibrary.org/b/isbn/9781587677809-L.jpg' },
  { id: 3,  title: 'Tears of the Giraffe',       author: 'Alexander McCall Smith', status: 'finished',  cover: 'https://covers.openlibrary.org/b/isbn/9780307275486-L.jpg' },
  { id: 4,  title: 'Saving Noah',                author: 'Lucinda Berry',          status: 'finished',  cover: 'https://covers.openlibrary.org/b/isbn/9781503936584-L.jpg' },
  { id: 5,  title: '1984',                       author: 'George Orwell',          status: 'finished',  cover: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg' },
  { id: 6,  title: 'The Wife Between Us',        author: 'Greer Hendricks',        status: 'finished',  cover: 'https://covers.openlibrary.org/b/isbn/9781250144836-L.jpg' },
  { id: 7,  title: 'The Secret of Secrets',      author: 'Dan Brown',              status: 'finished',  cover: 'https://covers.openlibrary.org/b/isbn/9780385545990-L.jpg' },
  { id: 8,  title: 'The Teller of Secrets',      author: 'Bisi Adjapon',           status: 'finished',  cover: 'https://covers.openlibrary.org/b/isbn/9780062937728-L.jpg' },
  { id: 9,  title: 'The River Between',          author: 'Ngugi wa Thiong\'o',     status: 'finished',  cover: 'https://covers.openlibrary.org/b/isbn/9780435905484-L.jpg' },
  { id: 10, title: 'Of Love and Evil',           author: 'Anne Rice',              status: 'finished',  cover: 'https://covers.openlibrary.org/b/isbn/9780385533560-L.jpg' },
  { id: 11, title: 'I Who Have Never Known Men', author: 'Jacqueline Harpman',     status: 'finished',  cover: 'https://covers.openlibrary.org/b/isbn/9780099554912-L.jpg' },
  { id: 12, title: 'I Am Not Sidney Poitier',    author: 'Percival Everett',       status: 'finished',  cover: 'https://covers.openlibrary.org/b/isbn/9781555975272-L.jpg' },
  { id: 13, title: 'The Hangman',                author: 'Louise Penny',           status: 'finished',  cover: 'https://covers.openlibrary.org/b/isbn/9781250070197-L.jpg' },
  { id: 14, title: 'The Lost Symbol',            author: 'Dan Brown',              status: 'finished',  cover: 'https://covers.openlibrary.org/b/isbn/9780385504225-L.jpg' },
  { id: 15, title: 'The Dark Forest',            author: 'Cixin Liu',              status: 'finished',  cover: 'https://covers.openlibrary.org/b/isbn/9780765377081-L.jpg' },
  { id: 16, title: 'Origin',                     author: 'Dan Brown',              status: 'finished',  cover: 'https://covers.openlibrary.org/b/isbn/9780385514231-L.jpg' },
  { id: 17, title: 'Two Can Keep a Secret',      author: 'Karen M. McManus',       status: 'finished',  cover: 'https://covers.openlibrary.org/b/isbn/9781524714734-L.jpg' },
  { id: 18, title: 'The Suicide House',          author: 'Charlie Donlea',         status: 'finished',  cover: 'https://covers.openlibrary.org/b/isbn/9781496734174-L.jpg' },
  { id: 19, title: 'The Tenant',                 author: 'Freida McFadden',        status: 'finished',  cover: 'https://covers.openlibrary.org/b/isbn/9781728260174-L.jpg' },

  // Currently reading
  { id: 20, title: 'The Secret Life of Saeed the Pessoptimist', author: 'Emile Habiby', status: 'reading', cover: 'https://covers.openlibrary.org/b/isbn/9781566564151-L.jpg' },

  // TBR
  { id: 21, title: 'On Black Sisters Street',              author: 'Chika Unigwe',       status: 'wantToRead', cover: 'https://covers.openlibrary.org/b/isbn/9780679604464-L.jpg' },
  { id: 22, title: 'There Is No Antimemetics Division',    author: 'qntm',               status: 'wantToRead', cover: 'https://covers.openlibrary.org/b/isbn/9798697449424-L.jpg' },
  { id: 23, title: 'No One Dies Yet',                      author: 'Muhammed Mustapha',  status: 'wantToRead', cover: 'https://covers.openlibrary.org/b/isbn/9780385548946-L.jpg' },
  { id: 24, title: 'The Good of Small Things',             author: 'Kerala Writer',      status: 'wantToRead', cover: 'https://covers.openlibrary.org/b/isbn/9780670919574-L.jpg' },
  { id: 25, title: 'How to Read the Air',                  author: 'Dinaw Mengestu',     status: 'wantToRead', cover: 'https://covers.openlibrary.org/b/isbn/9781594487972-L.jpg' },
  { id: 26, title: 'The Book of Chameleons',               author: 'José Eduardo Agualusa', status: 'wantToRead', cover: 'https://covers.openlibrary.org/b/isbn/9781416596110-L.jpg' },
  { id: 27, title: 'The Old Drift',                        author: 'Namwali Serpell',    status: 'wantToRead', cover: 'https://covers.openlibrary.org/b/isbn/9781101973622-L.jpg' },
  { id: 28, title: 'Like a Mule Bringing Ice Cream to the Sun', author: 'Sarah Ladipo Manyika', status: 'wantToRead', cover: 'https://covers.openlibrary.org/b/isbn/9781911508014-L.jpg' },
]

export default function LibraryInterior() {
  const books = useGameStore((state) => state.books)
  const addBook = useGameStore((state) => state.addBook)
  const updateBookStatus = useGameStore((state) => state.updateBookStatus)
  const knowledge = useGameStore((state) => state.stats.knowledge)

  const [newTitle, setNewTitle] = useState('')
  const [newStatus, setNewStatus] = useState('reading')
  const [filter, setFilter] = useState('all')

  // Merge store books with initial books
  const allBooks = [...INITIAL_BOOKS, ...books]
  const reading = allBooks.filter(b => b.status === 'reading')
  const finished = allBooks.filter(b => b.status === 'finished')
  const wantToRead = allBooks.filter(b => b.status === 'wantToRead')

  const handleAdd = () => {
    if (!newTitle.trim()) return
    addBook(newTitle.trim(), newStatus)
    setNewTitle('')
  }

  const sections = [
    { id: 'reading',     label: 'Currently Reading', books: reading,    color: '#4a90d9' },
    { id: 'finished',    label: 'Finished',           books: finished,   color: '#5a9e2f' },
    { id: 'wantToRead',  label: 'Want to Read',       books: wantToRead, color: '#c8a040' },
  ]

  const displayed = filter === 'all' ? sections : sections.filter(s => s.id === filter)

  return (
    <div className="flex flex-col gap-6">

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {[{ id: 'all', label: 'All Books' }, ...sections.map(s => ({ id: s.id, label: s.label }))].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className="text-xs rounded-full px-3 py-1 transition-colors"
            style={{
              background: filter === tab.id ? '#c8a040' : 'rgba(255,255,255,0.06)',
              color: filter === tab.id ? '#1a0f05' : '#c8a96e'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Book sections */}
      {displayed.map(section => (
        <div key={section.id}>
          <p className="text-xs uppercase tracking-wider mb-3 font-semibold" style={{ color: section.color }}>
            {section.label} — {section.books.length} book{section.books.length !== 1 ? 's' : ''}
          </p>

          {section.books.length === 0 && (
            <p className="text-stone-600 text-sm italic">No books here yet.</p>
          )}

          {/* Book grid with covers */}
          <div className="grid grid-cols-4 gap-3">
            {section.books.map(book => (
              <div key={book.id} className="flex flex-col gap-1 group">
                {/* Cover */}
                <div className="relative rounded-lg overflow-hidden aspect-[2/3] bg-stone-800">
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-2"
                      style={{ background: section.color + '33' }}>
                      <p className="text-xs text-center" style={{ color: section.color }}>
                        {book.title}
                      </p>
                    </div>
                  )}
                  {/* Hover overlay with status change */}
                  {book.id > 19 && (
                    <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1">
                      <select
                        className="text-xs rounded px-1 py-0.5 w-full outline-none"
                        style={{ background: '#1a0f05', color: '#c8a96e' }}
                        value={book.status}
                        onChange={e => updateBookStatus(book.id, e.target.value)}
                        onClick={e => e.stopPropagation()}
                      >
                        <option value="wantToRead">TBR</option>
                        <option value="reading">Reading</option>
                        <option value="finished">Finished</option>
                      </select>
                    </div>
                  )}
                </div>
                {/* Title */}
                <p className="text-xs text-stone-300 leading-tight line-clamp-2">{book.title}</p>
                {book.author && <p className="text-xs text-stone-600 leading-tight">{book.author}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Add a book */}
      <div className="rounded-2xl p-5 mt-2" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">Add a book</p>
        <div className="flex flex-col gap-2">
          <input
            className="bg-stone-800 text-stone-100 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Book title..."
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
          />
          <select
            className="bg-stone-800 text-stone-100 rounded-lg px-3 py-2 text-sm outline-none"
            value={newStatus}
            onChange={e => setNewStatus(e.target.value)}
          >
            <option value="wantToRead">Want to read</option>
            <option value="reading">Currently reading</option>
            <option value="finished">Finished</option>
          </select>
          <button
            onClick={handleAdd}
            className="bg-amber-700 hover:bg-amber-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            Add to Library
          </button>
        </div>
      </div>

    </div>
  )
}