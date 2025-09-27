const [formData, setFormData] = useState({
    heading: '',
    subheading: '',
    publishedDate: '',
    validUntil: '',
    isActive: false,
    featured: false,
  });

<div className="grid grid-cols-3 gap-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Published Date
    </label>
    <input
      type="date"
      value={formData.publishedDate}
      onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
  
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Valid Until
    </label>
    <input
      type="date"
      value={formData.validUntil}
      onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <div className="flex flex-col gap-2">
    <div className="flex items-center">
      <input
        type="checkbox"
        id="isActive"
        checked={formData.isActive}
        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
        className="mr-2"
      />
      <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
        Active
      </label>
    </div>
    
    <div className="flex items-center">
      <input
        type="checkbox"
        id="featured"
        checked={formData.featured}
        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
        className="mr-2"
      />
      <label htmlFor="featured" className="text-sm font-medium text-gray-700">
        Featured
      </label>
    </div>
  </div>
</div>